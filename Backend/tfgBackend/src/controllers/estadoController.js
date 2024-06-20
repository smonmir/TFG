import {Estado} from '../models/estadoModel.js'
import { Pedido } from '../models/pedidoModel.js';

export const getEstado= async (req, res) => {
    try {
        const estado = await Estado.findAll();
        res.json(estado);
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  
export const getEstadoById = async (req, res) => {
    const estadoId = req.params.id;

    try {
        const estado = await Estado.findByPk(estadoId);
        if (!estado) {
            return res.status(404).json({
                message: 'Estado no encontrado' 
            });
        }
        res.json(estado);
    } catch (error) {
        console.error('Error al obtener el estado por id:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const createEstado = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const nuevoEstado = await Estado.create({
            nombre,
            descripcion
        });

        res.status(201).json(nuevoEstado);
    } catch (error) {
        console.error('Error al crear estado:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
  


export const updateEstado = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const estado = await Estado.findByPk(id); 

        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }

        const datosActualizados = {};

        datosActualizados.nombre = nombre || estado.nombre;
        datosActualizados.descripcion = descripcion || estado.descripcion;

        await estado.update(datosActualizados);
    
        const estadoActualizado = await Estado.findByPk(id);
    
        res.json(estadoActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const deleteEstado = async (req, res) => {
    const id = req.params.id;

    try {
        const estado = await Estado.findByPk(id);

        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }

        await estado.destroy({
            where: { id: id },
            cascade: true
          });

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar estado:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
