import jwt from 'jsonwebtoken'
import isEmail from 'email-validator'
import bcrypt from 'bcrypt'


const secretKey = 'estaesmiclavesecreta';


export function generateToken(userId) {
    const payload = { userId };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}


export function isValidEmail(email) {
    return isEmail.validate(email);
}


export async function comparePassword(contrasena, hashedContrasena) {
    try {
        const isMatch = await bcrypt.compare(contrasena, hashedContrasena);
        return isMatch;
    } catch (error) {
        console.error('Error al comparar contraseñas:', error);
        return false;
    }
}
