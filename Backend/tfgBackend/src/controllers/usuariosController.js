import {Usuario} from '../models/usuarioModel.js'
import {Rol} from '../models/rolModel.js'
import {generateToken, isValidEmail, comparePassword} from '../servicios/usuarioServicio.js'
import bcrypt from 'bcrypt'
import { sendEmail } from '../servicios/emailServicio.js';
import * as crypto from 'crypto';

const verificationCodes = new Map();


export const enviarCodigoVerificacion = async (req, res) => {
  const { email } = req.body;

  try {
    const usuarioExistenteEmail = await Usuario.findOne({ where: { email } });
    if (usuarioExistenteEmail) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
    }

    const codigoVerificacion = crypto.randomBytes(3).toString('hex');
    verificationCodes.set(email, codigoVerificacion);

    await sendEmail(email, 'Código de verificación', `Tu código de verificación es: ${codigoVerificacion}`);
    res.status(200).json({ mensaje: 'Código de verificación enviado al correo electrónico.' });
  } catch (error) {
    console.error('Error al enviar código de verificación:', error);
    return res.status(500).json({ message: 'Algo fue mal' });
  }
};


export const verificarCodigo = async (req, res) => {
    const { email, codigo } = req.body;
  
    const codigoAlmacenado = verificationCodes.get(email);
    if (!codigoAlmacenado || codigoAlmacenado !== codigo) {
      return res.status(400).json({ mensaje: 'Código de verificación incorrecto' });
    }
  
    verificationCodes.delete(email);
    res.status(200).json({ mensaje: 'Correo electrónico verificado con éxito' });
};


export const createUsuario = async (req, res) => {
    const { nombre, email, contrasena, telefono, rol_id } = req.body;

    try {
        const usuarioExistenteEmail = await Usuario.findOne({ where: { email } });
        const usuarioExistenteNombre = await Usuario.findOne({ where: { nombre } });
      
        if (usuarioExistenteEmail || usuarioExistenteNombre) {
          const mensajeError = usuarioExistenteEmail ? 'El correo electrónico ya está en uso' : 'El nombre de usuario ya está en uso';
          return res.status(400).json({ mensaje: mensajeError });
        }

        else{
            let rolId = rol_id; 

            if (rolId === null || isNaN(rolId)) {
                rolId = 2;
                console.log('Usuario registrado sin rol, se le asigna rol 2(cliente) por defecto');
            }
        
            const rol = await Rol.findByPk(rolId);
            if (!rol) {
                return res.status(400).json({ mensaje: 'El rol especificado no existe' });
            }
            
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            console.log("hashedPassword: "+hashedPassword)

            const nuevoUsuario = await Usuario.create({
                nombre,
                email,
                contrasena: hashedPassword,
                telefono,
                rol_id: rolId
            });
            
            res.status(201).json(nuevoUsuario);
        }
    } catch (error) {
        console.error('Error al crear usuario:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        if (!email || !contrasena) {
            return res.status(400).json({ message: 'Faltan credenciales: nombre y/o contrasena requeridos' });
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Formato de email invalido' });
        }

        const user = await Usuario.findOne({
            where: { email },
            include: [Rol]
        });
        
        if (!user) {
            return res.status(401).json({ message: 'Email invalido' });
        }

        const validPassword = await comparePassword(contrasena, user.contrasena);
        
        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña invalido' });
        }

        const token = generateToken(user.id);
        res.json({ user, token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Algo fue mal' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.user.id, {
            include: [Rol]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        return res.status(500).json({ message: 'Algo fue mal' });
    }
};




export const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findAll({
            include: [
                {
                  model: Rol,
                  attributes: ['id', 'nombre', 'descripcion']
                }
            ]
        });
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  
export const getUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;

    try {
        const usuario = await Usuario.findByPk(usuarioId, {
            include: [
                {
                  model: Rol,
                  attributes: ['id', 'nombre', 'descripcion']
                }
            ]
        });
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado' 
            });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario por id:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contrasena, telefono, rol_id } = req.body;

    try {
        const usuario = await Usuario.findByPk(id); 

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if(rol_id != null){
            const rol = await Rol.findByPk(rol_id);

            if (!rol) {
                return res.status(400).json({ mensaje: "El rol especificado no existe" });
            }
        }

        if (nombre && nombre !== usuario.nombre) {
            const nombreExistente = await Usuario.findOne({ where: { nombre } });
            if (nombreExistente) {
                return res.status(400).json({ message: 'El nombre ya está en uso' });
            }
        }

        if (email && email !== usuario.email) {
            const emailExistente = await Usuario.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(400).json({ message: 'El email ya está en uso' });
            }
        }


        const datosActualizados = {};

        datosActualizados.nombre = nombre || usuario.nombre;
        datosActualizados.email = email || usuario.email;
        datosActualizados.contrasena = contrasena || usuario.contrasena;
        datosActualizados.telefono = telefono || usuario.telefono;
        datosActualizados.rol_id = rol_id || usuario.rol_id;

        await usuario.update(datosActualizados);
    
        const usuarioActualizado = await Usuario.findByPk(id);
    
        res.json(usuarioActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const deleteUsuario = async (req, res) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
