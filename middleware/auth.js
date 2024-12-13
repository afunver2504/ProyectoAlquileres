const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const token = req.header('x-auth-token'); 
    console.log("Token recibido:", token);
    if (!token) {
        return res.status(401).send('Acceso no autorizado');
    }

    try {
        const decoded = jwt.verify(token, 'mi-secreto');
        req.user = { _id: decoded.userId };
        next(); 
    } catch (error) {
        console.error('Token inválido:', error); 
        res.status(400).send('Token inválido'); 
    }
}


module.exports = { verificarToken };