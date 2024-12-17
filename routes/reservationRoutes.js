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

const isDateOverlap = (newStart, newEnd, existingStart, existingEnd) => {
    return newStart <= existingEnd && newEnd >= existingStart;
};

router.post('/createReservation', verificarToken, upload.single('contract'), async (req, res) => {
    try {
        const { carId, tariffType, startDate, endDate } = req.body;

        if (!carId || !tariffType || !startDate || !endDate || !req.file) {
            return res.status(400).json({ message: 'Faltan campos obligatorios.' });
        }

        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ message: 'El archivo debe ser un PDF.' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end) || start >= end) {
            return res.status(400).json({ message: 'Las fechas no son válidas.' });
        }

        const reservasExistentes = await Reservation.find({ carId });
        for (const reserva of reservasExistentes) {
            if (isDateOverlap(start, end, reserva.start, reserva.end)) {
                return res.status(400).json({ message: 'El coche ya está reservado en las fechas seleccionadas.' });
            }
        }

        const diasReserva = (end - start) / (1000 * 3600 * 24);

        const car = await Vehicle.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Vehículo no encontrado.' });
        }

        const tariff = car.tariff.find(t => t.type.toLowerCase().trim() === tariffType.toLowerCase().trim());
        if (!tariff) {
            return res.status(400).json({ message: 'Tarifa no encontrada para este vehículo.' });
        }

        let dailyPrice = 0;
        let totalPrice = 0;
        let sumDays = 0;

        if (diasReserva >= 1 && diasReserva <= 3) {
            dailyPrice = tariff.prices["1-3_days"];
            totalPrice = dailyPrice * diasReserva;
        } else if (diasReserva >= 4 && diasReserva <= 6) {
            dailyPrice = tariff.prices["4-6_days"];
            totalPrice = dailyPrice * diasReserva;
        } else if (diasReserva >= 7 && diasReserva <= 30) {
            dailyPrice = tariff.prices["7_days"];
            totalPrice = dailyPrice * diasReserva;
        } else if (diasReserva === 31) {
            dailyPrice = tariff.prices["1_month"];
            totalPrice = dailyPrice * 1
        } else if (diasReserva >= 32) {
            sumDays = diasReserva;
            dailyPrice = tariff.prices["1_month"] / 31;
            dailyPrice = Math.round(dailyPrice * 100) / 100;
            totalPrice = tariff.prices["1_month"] + ((sumDays - 31) * dailyPrice);
            totalPrice = Math.round(totalPrice * 100) / 100;
        }

        if (dailyPrice === 0) {
            return res.status(400).json({ message: 'La duración de la reserva no es válida.' });
        }

        const fianza = tariff.deposit;

        const newReservation = new Reservation({
            userId: req.user._id,
            carId,
            tariffType,
            selectedDates: [start, end],
            totalPrice,
            fianza,
            contractPDF: req.file.path
        });

        await newReservation.save();
        res.status(201).json({ message: 'Reserva creada exitosamente.' });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Error al crear la reserva.', error });
    }
});

router.get('/userReservations', verificarToken, async (req, res) => {
    console.log('Ruta /userReservations alcanzada');
    try {
        const userId = req.user._id;

        const reservas = await Reservation.find({ userId }).populate('carId');
        if (reservas.length === 0) {
            return res.status(404).json({ message: 'No tienes reservas.' });
        }

        const reservasDetalles = await Promise.all(
            reservas.map(async reserva => {
                const car = await Vehicle.findById(reserva.carId);
                return {
                    _id: reserva._id,
                    nombreVehiculo: car ? car.name : 'Vehículo desconocido',
                    fechaInicio: reserva.selectedDates[0],
                    fechaFin: reserva.selectedDates[1],
                    totalPrice: reserva.totalPrice,
                    fianza: reserva.fianza,
                    contratoPDF: reserva.contractPDF
                };
            })
        );

        res.json(reservasDetalles);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas.' });
    }
});

router.get('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reservation.findById(id).populate('carId');

        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        const car = reserva.carId;

        res.json({
            _id: reserva._id,
            nombreVehiculo: car.name,
            categoriaVehiculo: car.category,
            fechaInicio: reserva.selectedDates[0],
            fechaFin: reserva.selectedDates[1],
            totalPrice: reserva.totalPrice,
            fianza: reserva.fianza,
            contratoPDF: reserva.contractPDF
        });
    } catch (error) {
        console.error('Error al obtener detalles de la reserva:', error);
        res.status(500).json({ message: 'Error al obtener detalles de la reserva.' });
    }
});

router.get('/dias/:carId', async (req, res) => {
    try {
        const { carId } = req.params;

        const reservas = await Reservation.find({ carId });

        if (!reservas || reservas.length === 0) {
            return res.status(200).json({ message: 'Este coche no tiene días reservados.', dates: [] });
        }

        const diasReservados = reservas.map(reserva => {
            return {
                startDate: reserva.selectedDates[0],
                endDate: reserva.selectedDates[1]    
            };
        });

        res.status(200).json({ dates: diasReservados });
    } catch (error) {
        console.error('Error al obtener días reservados:', error);
        res.status(500).json({ message: 'Error al obtener los días reservados.' });
    }
});


router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const reserva = await Reservation.findByIdAndDelete(req.params.id);
        if (!reserva) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
        }

        res.status(200).json({ mensaje: 'Reserva eliminada con éxito.' });
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la reserva.' });
    }
});


module.exports = router;



