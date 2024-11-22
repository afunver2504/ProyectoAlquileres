const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Reservation = require('../models/reservation');
const Vehicle = require('../models/vehicle');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../uploads/contracts');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


// Ruta para crear una reserva
router.post('/createReservation', verificarToken, upload.single('contract'), async (req, res) => {
    try {
        const { carId, tariffType, startDate, endDate } = req.body;

        if (!carId || !tariffType || !startDate || !endDate || !req.file) {
            return res.status(400).json({ message: 'Faltan campos obligatorios.' });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'El archivo debe ser un PDF.' });
        }

        const startDateParsed = new Date(startDate);
        const endDateParsed = new Date(endDate);
        if (isNaN(startDateParsed) || isNaN(endDateParsed) || startDateParsed >= endDateParsed) {
            return res.status(400).json({ message: 'Las fechas no son válidas.' });
        }

        const diasReserva = (endDateParsed - startDateParsed) / (1000 * 3600 * 24);

        // Buscar el coche en la base de datos
        const car = await Vehicle.findById(carId);
        if (!car) {
            return res.status(400).json({ message: 'Coche no encontrado.' });
        }

        // Obtener la tarifa seleccionada
        const tariff = car.tariff.find(t => t.type === tariffType);
        if (!tariff) {
            return res.status(400).json({ message: 'Tarifa no encontrada para este vehículo.' });
        }

        // Calcular el precio de la reserva basado en la duración
        let dailyPrice = 0;
        if (diasReserva >= 1 && diasReserva <= 3) {
            dailyPrice = tariff.prices["1-3_days"];
        } else if (diasReserva >= 4 && diasReserva <= 6) {
            dailyPrice = tariff.prices["4-6_days"];
        } else if (diasReserva === 7) {
            dailyPrice = tariff.prices["7_days"];
        } else if (diasReserva >= 30) {
            dailyPrice = tariff.prices["1_month"];
        }

        if (dailyPrice === 0) {
            return res.status(400).json({ message: 'La duración de la reserva no es válida.' });
        }

        const totalPrice = dailyPrice * diasReserva;
        const fianza = tariff.deposit; // Fianza basada en la tarifa seleccionada

        // Crear la nueva reserva
        const newReservation = new Reservation({
            userId: req.user._id,
            carId,
            tariffType,
            selectedDates: [startDateParsed, endDateParsed],
            totalPrice,
            fianza,
            contractPDF: req.file.path
        });

        await newReservation.save();
        res.status(201).json({ message: 'Reserva creada exitosamente.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reserva.', error });
    }
});


module.exports = router;

