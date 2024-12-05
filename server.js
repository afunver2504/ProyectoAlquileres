const conector = require("./database/conexion.js");
const express = require("express");
const cors = require("cors");
const auth_paths = require("./routes/userRoutes.js");
const vehiclePaths = require("./routes/vehicleRoutes.js");
const reservationRoutes = require('./routes/reservationRoutes');
const Vehicle = require('./models/vehicle');

console.log("Iniciando servidor...");
conector.conexion(); 

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.listen(5000, function () {
    console.log("Servidor escuchando en el puerto 5000");
});

app.get('/vehicles/cars/:id/:name', async (req, res) => {
    try {
        const { id: cocheId, name: cocheNombre } = req.params;

        const coche = await Vehicle.findById(cocheId);

        if (!coche) {
            return res.status(404).json({ message: 'Coche no encontrado.' });
        }

        if (coche.name !== cocheNombre) {
            return res.status(404).json({ message: 'El nombre del coche no coincide.' });
        }

        res.json(coche);

    } catch (error) {
        console.error("Error al obtener el coche:", error);
        res.status(500).json({ message: 'Error al obtener el coche.' });
    }
});

// Rutas
app.use("/auth", auth_paths.router);
app.use("/vehicles", vehiclePaths); 
app.use("/reservations", reservationRoutes);



