const validator = require("validator");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require('jsonwebtoken');
const Vehicle = require("../models/vehicle");

async function firstpath(req, res) {
    console.log("Endpoint ejecutado");

    return res.status(200).send(`
        <div>
            <h1>Bienvenido a la API de usuarios</h1>
        </div>
    `);
}

async function register(req, res) {
    try {
        console.log("Datos recibidos:", req.body);

        const {
            nombre,
            dni,
            correo,
            fechaNacimiento,
            direccion,
            codigoPostal,
            telefono,
            fechaExpedicion,
            fechaCaducidad,
            contraseña,
            confirmarContraseña,
        } = req.body;

        if (
            !nombre ||
            !dni ||
            !correo ||
            !fechaNacimiento ||
            !direccion ||
            !codigoPostal ||
            !telefono ||
            !fechaExpedicion ||
            !fechaCaducidad ||
            !contraseña ||
            !confirmarContraseña
        ) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (!validator.isEmail(correo)) {
            throw new Error("El correo electrónico no es válido.");
        }

        if (dni.length !== 9) {
            throw new Error("El DNI debe tener 9 caracteres.");
        }

        if (telefono.length !== 9) {
            throw new Error("El teléfono debe tener 9 caracteres.");
        }

        if (contraseña !== confirmarContraseña) {
            throw new Error("Las contraseñas no coinciden.");
        }

        if (contraseña.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        const existingUser = await User.findOne({ $or: [{ dni }, { correo }] });
        if (existingUser) {
            throw new Error("El DNI o el correo electrónico ya están en uso.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        const newUser = new User({
            nombre,
            dni,
            correo,
            fechaNacimiento,
            direccion,
            codigoPostal,
            telefono,
            fechaExpedicion,
            fechaCaducidad,
            contraseña: hashedPassword,
        });

        const userSaved = await newUser.save();
        console.log("Usuario guardado:", userSaved);

        return res.status(201).json({
            status: "Usuario registrado con éxito",
            usuario: userSaved,
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        return res.status(400).json({
            status: "error",
            mensaje: "Hubo un problema al registrar el usuario.",
            error: error.message,
        });
    }
}

async function login(req, res) {
    try {
        console.log("Intentando iniciar sesión:", req.body);

        const { dni, correo, nombre, contraseña } = req.body;

        if (!dni && !correo && !nombre) {
            throw new Error("Debes proporcionar DNI, correo electrónico o nombre.");
        }
        if (!contraseña) {
            throw new Error("La contraseña es obligatoria.");
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
            throw new Error("Usuario no encontrado.");
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta.");
        }

        const token = jwt.sign(
            { userId: user._id, nombre: user.nombre }, 
            'mi-secreto', 
            { expiresIn: '1h' } 
        );

        console.log("Inicio de sesión exitoso para:", user);

        return res.status(200).json({
            status: "Inicio de sesión exitoso",
            token,
        });
    } catch (error) {
        console.error("Error en inicio de sesión:", error.message);
        return res.status(400).json({
            status: "error",
            mensaje: "Hubo un problema al iniciar sesión.",
            error: error.message,
        });
    }
}

async function obtenerCochePorId(req, res) {
    try {
        const cocheId = req.params.id;
        const coche = await Vehicle.findById(cocheId);

        if (!coche) {
            return res.status(404).json({ message: 'Coche no encontrado.' });
        }

        res.json(coche);  // Enviar el coche encontrado al cliente
    } catch (error) {
        console.error('Error al obtener coche:', error);
        res.status(500).json({ message: 'Error al obtener el coche.' });
    }
}

module.exports = {
    firstpath,
    register,
    login,
    obtenerCochePorId,
};

