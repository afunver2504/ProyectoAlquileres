const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    nombre: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    correo: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/\S+@\S+\.\S+/, "Por favor ingresa un correo electrónico válido"] 
    },
    fechaNacimiento: { type: Date, required: true },
    direccion: { type: String, required: true },
    codigoPostal: { type: String, required: true },
    telefono: { type: String, required: true },
    fechaExpedicion: { type: Date, required: true },
    fechaCaducidad: { type: Date, required: true },
    contraseña: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model("User", UserSchema, "users");

