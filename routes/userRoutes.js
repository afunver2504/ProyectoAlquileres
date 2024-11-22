const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const { verificarToken } = require('../middleware/auth'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

router.post('/register', controller.register);

router.post('/login', async (req, res) => {
    const { dni, correo, nombre, contraseña } = req.body;

    if (!dni && !correo && !nombre) {
        return res.status(400).json({ mensaje: 'Debes proporcionar DNI, correo electrónico o nombre.' });
    }

    if (!contraseña) {
        return res.status(400).json({ mensaje: 'La contraseña es obligatoria.' });
    }

    let user;
    if (dni) {
        user = await User.findOne({ dni });
    } else if (correo) {
        user = await User.findOne({ correo });
    } else if (nombre) {
        user = await User.findOne({ nombre });
    }

    if (!user) {
        return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
        return res.status(400).json({ mensaje: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign({ userId: user._id}, 'mi-secreto', { expiresIn: '1h' });
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token});
});

router.get("public/paginaWeb.html", verificarToken, (req, res) => {
    const { nombre } = req.user; 
    res.json({ mensaje: `Bienvenido, ${nombre}` }); 
});

module.exports = { router };