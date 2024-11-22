const mongoose = require('mongoose');
const express = require('express');
const Vehicle = require('../models/vehicle');
const router = express.Router();
const { obtenerCochePorId } = require("../controllers/controller");

router.post("/reserveVehicle", async (req, res) => {
    const { vehicleId, startDate, endDate } = req.body;

    if (!mongoose.isValidObjectId(vehicleId)) {
        return res.status(400).json({ error: "ID de vehículo no válido" });
    }

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        
        if (!vehicle) {
            return res.status(404).json({ error: "Vehículo no encontrado" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        let datesToReserve = [];
        let currentDate = start;
        
        while (currentDate <= end) {
            datesToReserve.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        await Vehicle.updateOne(
            { _id: vehicleId },
            {
                $push: {
                    availability: {
                        $each: datesToReserve.map(date => ({ date, isReserved: true })),
                    }
                }
            }
        );

        res.json({ success: true, message: "Reserva confirmada" });

    } catch (err) {
        console.error("Error al realizar la reserva:", err);
        res.status(500).json({ error: "Error al realizar la reserva" });
    }
});

router.get("/cars/:id", obtenerCochePorId);

module.exports = router;



