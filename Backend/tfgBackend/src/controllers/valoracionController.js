import { Usuario } from '../models/usuarioModel.js'
import { Servicio } from '../models/servicioModel.js';
import { Rol } from '../models/rolModel.js';
import { Valoracion } from '../models/valoracionModel.js'

export const getValoracion = async (req, res) => {
    try {
        const valoracion = await Valoracion.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'email', 'telefono'],
                    include: [{
                        model: Rol,
                        attributes: ['id', 'nombre', 'descripcion']
                    }]
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'],
                    include: [{
                        model: Usuario,
                        attributes: ['id', 'nombre', 'email', 'telefono'],
                        include: [{
                            model: Rol,
                            attributes: ['id', 'nombre', 'descripcion'] 
                        }]
                    }]
                }
              ]
        });
        res.json(valoracion);
    } catch (error) {
        console.error('Error al obtener valoracion:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  
export const getValoracionById = async (req, res) => {
    const valoracionId = req.params.id;

    try {
        const valoracion = await Valoracion.findByPk(valoracionId, {
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'email', 'telefono'],
                    include: [{
                        model: Rol,
                        attributes: ['id', 'nombre', 'descripcion'] 
                    }]
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'],
                    include: [{
                        model: Usuario,
                        attributes: ['id', 'nombre', 'email', 'telefono'],
                        include: [{
                            model: Rol, // Incluir el modelo 'Rol'
                            attributes: ['id', 'nombre', 'descripcion'] // Especificar atributos de 'Rol'
                        }]
                    }]
                }
              ]
        });
        if (!valoracion) {
            return res.status(404).json({
                message: 'Valoracion no encontrado' 
            });
        }
        res.json(valoracion);
    } catch (error) {
        console.error('Error al obtener valoracion por id:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const createValoracion = async (req, res) => {
    const { nombre, puntuacion, comentario, usuario_id, servicio_id } = req.body;

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(400).json({ mensaje: "El usuario especificado no existe" });
        }

        const servicio = await Servicio.findByPk(servicio_id);
        if (!servicio) {
            return res.status(400).json({ mensaje: "El servicio especificado no existe" });
        }

        const nuevoValoracion = await Valoracion.create({
            nombre,
            puntuacion,
            comentario,
            usuario_id,
            servicio_id
        });

        res.status(201).json(nuevoValoracion);
    } catch (error) {
        console.error('Error al crear valoracion:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
  


export const updateValoracion = async (req, res) => {
    const { id } = req.params;
    const { nombre, puntuacion, comentario, usuario_id, servicio_id } = req.body;

    try {
        const valoracion = await Valoracion.findByPk(id); 

        if (!valoracion) {
            return res.status(404).json({ message: 'Valoracion no encontrado' });
        }
        
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(400).json({ mensaje: "El usuario especificado no existe" });
        }

        const servicio = await Servicio.findByPk(servicio_id);
        if (!servicio) {
            return res.status(400).json({ mensaje: "El servicio especificado no existe" });
        }

        const datosActualizados = {};

        datosActualizados.nombre = nombre || valoracion.nombre;
        datosActualizados.puntuacion = puntuacion || valoracion.puntuacion;
        datosActualizados.comentario = comentario || valoracion.comentario;
        datosActualizados.usuario_id = usuario_id || valoracion.usuario_id;
        datosActualizados.servicio_id = servicio_id || valoracion.servicio_id;

        await valoracion.update(datosActualizados);
    
        const valoracionActualizado = await Valoracion.findByPk(id);
    
        res.json(valoracionActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar valoracion:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const deleteValoracion = async (req, res) => {
    const id = req.params.id;

    try {
        const valoracion = await Valoracion.findByPk(id);

        if (!valoracion) {
            return res.status(404).json({ message: 'Valoracion no encontrado' });
        }

        await valoracion.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar valoracion:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
