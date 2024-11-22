const mongoose = require("mongoose");

async function conexion() {
    try {
        await mongoose.connect("mongodb://localhost:27017/usuariosDB");
        console.log("¡Nos hemos conectado!");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
    }
}

module.exports = { conexion };