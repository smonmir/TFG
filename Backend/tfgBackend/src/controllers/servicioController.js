import { Servicio } from '../models/servicioModel.js'
import { Usuario } from '../models/usuarioModel.js'
import { Rol } from '../models/rolModel.js';
import { Sequelize } from 'sequelize';
import { Valoracion } from '../models/valoracionModel.js';
import { Pedido } from '../models/pedidoModel.js';

export const getServicio = async (req, res) => {
    try {
        const servicio = await Servicio.findAll({
            include: [
              {
                model: Usuario,
                attributes: ['id', 'nombre', 'email', 'telefono'],
                include: [{
                  model: Rol,
                  attributes: ['id', 'nombre', 'descripcion']
                }]
              }
            ]
        });
        
        res.json(servicio);
    } catch (error) {
        console.error('Error al obtener servicio:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  
export const getServicioById = async (req, res) => {
    const servicioId = req.params.id;

    try {
        const servicio = await Servicio.findByPk(servicioId, {
            include: [
                {
                  model: Usuario,
                  attributes: ['id', 'nombre', 'email', 'telefono'],
                  include: [{
                    model: Rol,
                    attributes: ['id', 'nombre', 'descripcion']
                  }]
                }
              ]
        });
        if (!servicio) {
            return res.status(404).json({
                message: 'Servicio no encontrado' 
            });
        }
        res.json(servicio);
    } catch (error) {
        console.error('Error al obtener servicio por id:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const getServiciosPaginados = async (req, res) => {
    try {
        const { page = 1, limit = 8, search = '', sortPrice = '', sortRating = '' } = req.query;

        const offset = (page - 1) * limit;

        const whereCondition = {
            [Sequelize.Op.or]: [
                { nombre: { [Sequelize.Op.like]: `%${search}%` } },
                { descripcion: { [Sequelize.Op.like]: `%${search}%` } }
            ]
        };

        let order = [];

        if (sortPrice) {
            order.push(['precio', sortPrice]);
        }

        if (sortRating) {
            order.push([Valoracion, 'puntuacion', sortRating]);
        }

        const { count, rows } = await Servicio.findAndCountAll({
            where: whereCondition,
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
                    model: Valoracion,
                    attributes: ['puntuacion'],
                }
            ],
            offset: offset,
            limit: parseInt(limit),
            order: order,
            distinct: true
        });

        const totalPages = Math.ceil(count / limit);
        res.json({ servicios: rows, totalPages: totalPages, currentPage: parseInt(page) });
    } catch (error) {
        console.error('Error al obtener servicios paginados:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};


export const getServiciosUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.usuarioId;
        const servicios = await Servicio.findAll({
            where: { usuario_id: idUsuario },
            include: [
                {
                model: Usuario,
                attributes: ['id', 'nombre', 'email', 'telefono'],
                include: [{
                    model: Rol,
                    attributes: ['id', 'nombre', 'descripcion']
                }]
                }
            ]
        });

        if (!servicios.length) {
            return res.status(404).json({
                message: `No se encontraron servicios para el usuario con ID ${idUsuario}`
            });
        }
    
        res.json(servicios);
    } catch (error) {
        console.error('Error al obtener servicios del usuario: ', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};

export const createServicio = async (req, res) => {
    const { nombre, descripcion, precio, imagen, usuario_id } = req.body;
    
    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
          return res.status(400).json({ message: 'El usuario especificado no existe' });
        }
    
        const nuevoServicio = await Servicio.create({
          nombre,
          descripcion,
          precio,
          imagen,
          usuario_id
        });
    

        console.log(nuevoServicio)

        res.status(201).json(nuevoServicio);
    } catch (error) {
        console.error('Error al crear servicio:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
    
};
  


export const updateServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen, usuario_id } = req.body;

    try {
        const servicio = await Servicio.findByPk(id); 

        console.log(req.body)

        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(400).json({ mensaje: "El usuario especificado no existe" });
        }

        const datosActualizados = {};

        datosActualizados.nombre = nombre || servicio.nombre;
        datosActualizados.descripcion = descripcion || servicio.descripcion;
        datosActualizados.precio = precio || servicio.precio;
        datosActualizados.imagen = imagen || servicio.imagen;
        datosActualizados.usuario_id = usuario_id || servicio.usuario_id;

        await servicio.update(datosActualizados);
    
        const servicioActualizado = await Servicio.findByPk(id);
    
        res.json(servicioActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar servicio:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const deleteServicio = async (req, res) => {
    const id = req.params.id;

    try {
        const servicio = await Servicio.findByPk(id);

        if (!servicio) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        await servicio.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar servicio:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
