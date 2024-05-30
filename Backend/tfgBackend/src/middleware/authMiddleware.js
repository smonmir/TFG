import jwt from 'jsonwebtoken'
import {Usuario} from '../models/usuarioModel.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'No se ha proporcionado el token de autenticación' });
    }

    const token = authorizationHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.userId;

    const usuario = await Usuario.findOne({ where: { id: userId } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    req.user = usuario;
    next();
    
  } catch (error) {
    console.error('Error al validar el token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
