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
        const cocheId = req.params.id;
        const cocheNombre = req.params.name;
        const coche = await Vehicle.findOne({ category: "Economica" });

        if (!coche) {
            return res.status(404).json({ message: 'Coche n encontrado.' });
        }

        //const vehiculo = coche.vehicle.find(v => v.name.toString() === cocheNombre);
        const vehiculo = coche.vehicle;
        
        if (!vehiculo) {
            return res.status(404).json({ message: 'Vehículo no encontrado dentro de la categoría.' });
        }

        for (let index = 0; index < vehiculo.length; index++) {
            if (vehiculo[index].name===cocheNombre){
                const modeloCoche = vehiculo[index]
                res.json(modeloCoche);
            }
        }
    
    } catch (error) {
        console.error("Error  obtener el coche:", error);
        res.status(500).json({ message: 'Error al obtener el coche.' });
    }
});

// Rutas
app.use("/auth", auth_paths.router);
app.use("/vehicles", vehiclePaths); 
app.use("/reservations", reservationRoutes);



