import {Usuario} from '../models/usuarioModel.js'
import {Rol} from '../models/rolModel.js'
import {generateToken, isValidEmail, comparePassword} from '../servicios/usuarioServicio.js'
import bcrypt from 'bcrypt'


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


export const createUsuario = async (req, res) => {
    const { nombre, email, contrasena, telefono = null, direccion = null, rol_id } = req.body;

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
                telefono: telefono == null ? null : telefono,
                direccion: direccion == null ? null : direccion,
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
    const { nombre, email, contrasena, telefono, direccion, rol_id } = req.body;

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

        const datosActualizados = {};

        datosActualizados.nombre = nombre || usuario.nombre;
        datosActualizados.email = email || usuario.email;
        datosActualizados.contrasena = contrasena || usuario.contrasena;
        datosActualizados.telefono = telefono || usuario.telefono;
        datosActualizados.direccion = direccion || usuario.direccion;
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
