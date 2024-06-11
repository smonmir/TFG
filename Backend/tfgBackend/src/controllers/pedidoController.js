import { Pedido } from '../models/pedidoModel.js'
import { Usuario } from '../models/usuarioModel.js';
import { Servicio } from '../models/servicioModel.js';
import { Estado } from '../models/estadoModel.js';
import {Rol} from '../models/rolModel.js'

export const getPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'email', 'telefono', 'direccion'],
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
                        attributes: ['id', 'nombre', 'email', 'telefono', 'direccion'],
                        include: [{
                          model: Rol,
                          attributes: ['id', 'nombre', 'descripcion']
                        }]
                    }]
                },
                {
                    model: Estado,
                    attributes: ['id', 'nombre', 'descripcion']
                },
            ]
        });
        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  
export const getPedidoById = async (req, res) => {
    const pedidoId = req.params.id;

    try {
        const pedido = await Pedido.findByPk(pedidoId, {
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nombre', 'email', 'telefono', 'direccion']
                },
                {
                    model: Servicio,
                    attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'usuario_id']
                },
                {
                    model: Estado,
                    attributes: ['id', 'nombre', 'descripcion']
                },
            ]
        });
        if (!pedido) {
            return res.status(404).json({
                message: 'Pedido no encontrado' 
            });
        }
        res.json(pedido);
    } catch (error) {
        console.error('Error al obtener pedido por id: ', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const getPedidosUsuario = async (req, res) => {
    try {
      const idUsuario = req.params.usuarioId;
      const pedidos = await Pedido.findAll({
        where: { usuario_id: idUsuario },
        include: [
          {
            model: Usuario,
            attributes: ['id', 'nombre', 'email', 'telefono', 'direccion'],
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
              attributes: ['id', 'nombre', 'email', 'telefono', 'direccion'],
              include: [{
                model: Rol,
                attributes: ['id', 'nombre', 'descripcion']
              }]
            }]
          },
          {
            model: Estado,
            attributes: ['id', 'nombre', 'descripcion']
          }
        ]
      });

      if (!pedidos.length) {
        return res.status(404).json({
          message: `No se encontraron pedidos para el usuario con ID ${idUsuario}`
        });
      }
  
      res.json(pedidos);
    } catch (error) {
      console.error('Error al obtener pedidos de usuario:', error);
      return res.status(500).json({
        message: 'Algo fue mal'
      });
    }
  };
  

export const createPedido = async (req, res) => {
    const { fecha, precio, usuario_id, servicio_id, estado_id } = req.body;

    try {
        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(400).json({ mensaje: "El usuario especificado no existe" });
        }

        const servicio = await Servicio.findByPk(servicio_id);
        if (!servicio) {
            return res.status(400).json({ mensaje: "El servicio especificado no existe" });
        }

        const estado = await Estado.findByPk(estado_id);
        if (!estado) {
            return res.status(400).json({ mensaje: "El estado especificado no existe" });
        }

        const nuevoPedido = await Pedido.create({
            fecha,
            precio,
            usuario_id,
            servicio_id,
            estado_id
        });

        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error('Error al crear usuario: ', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { fecha, precio, usuario_id, servicio_id, estado_id } = req.body;

    try {
        const pedido = await Pedido.findByPk(id); 

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(400).json({ mensaje: "El usuario especificado no existe" });
        }

        const servicio = await Servicio.findByPk(servicio_id);
        if (!servicio) {
            return res.status(400).json({ mensaje: "El servicio especificado no existe" });
        }

        const estado = await Estado.findByPk(estado_id);
        if (!estado) {
            return res.status(400).json({ mensaje: "El estado especificado no existe" });
        }

        const datosActualizados = {};

        datosActualizados.fecha = fecha || pedido.fecha;
        datosActualizados.precio = precio || pedido.precio;
        datosActualizados.usuario_id = usuario_id || pedido.usuario_id;
        datosActualizados.servicio_id = servicio_id || pedido.servicio_id;
        datosActualizados.estado_id = estado_id || pedido.estado_id;

        await pedido.update(datosActualizados);
    
        const pedidoActualizado = await Pedido.findByPk(id);
    
        res.json(pedidoActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar pedido: ', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const deletePedido = async (req, res) => {
    const id = req.params.id;

    try {
        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await pedido.destroy();

        res.sendStatus(204);
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};