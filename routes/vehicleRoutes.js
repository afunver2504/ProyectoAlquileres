const mongoose = require('mongoose');
const express = require('express');
const Vehicle = require('../models/vehicle');
const router = express.Router();

router.post('/reserveVehicle', async (req, res) => {
    const { vehicleId, startDate, endDate } = req.body;

    if (!mongoose.isValidObjectId(vehicleId)) {
        return res.status(400).json({ error: 'ID de vehículo no válido.' });
    }

    try {
        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehículo no encontrado.' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end) || start >= end) {
            return res.status(400).json({ error: 'Las fechas no son válidas.' });
        }

        const datesToReserve = [];
        let currentDate = start;

        while (currentDate <= end) {
            datesToReserve.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        vehicle.availability = vehicle.availability || [];
        vehicle.availability.push(
            ...datesToReserve.map(date => ({ date, isReserved: true }))
        );

        await vehicle.save();

        res.json({ success: true, message: 'Reserva confirmada.' });
    } catch (err) {
        console.error('Error al realizar la reserva:', err);
        res.status(500).json({ error: 'Error al realizar la reserva.' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'ID no válido.' });
    }

    try {
        const vehicle = await Vehicle.findById(id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehículo no encontrado.' });
        }

        res.json(vehicle);
    } catch (err) {
        console.error('Error al obtener el vehículo:', err);
        res.status(500).json({ error: 'Error al obtener el vehículo.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error('Error al obtener los vehículos:', err);
        res.status(500).json({ error: 'Error al obtener los vehículos.' });
    }
});

module.exports = router;



