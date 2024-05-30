import {Rol} from '../models/rolModel.js'

export const getRol = async (req, res) => {
    try {
        const rol = await Rol.findAll();
        res.json(rol);
    } catch (error) {
        console.error('Error al obtener el rol:', error);
        return res.status(500).json({
            message: 'Algo fue mal',
        });
    }
};
  

export const getRolById = async (req, res) => {
    const rolId = req.params.id;

    try {
        const rol = await Rol.findByPk(rolId);
        if (!rol) {
            return res.status(404).json({
                message: 'Rol no encontrado' 
            });
        }
        res.json(rol);
    } catch (error) {
        console.error('Error al obtener el rol por id:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};

export const createRol = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const nuevoRol = await Rol.create({
            nombre,
            descripcion
        });

        res.json(nuevoRol);
    } catch (error) {
        console.error('Error al crear el rol:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
  


export const updateRol= async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
  
        const datosActualizados = {};

        datosActualizados.nombre = nombre || rol.nombre;
        datosActualizados.descripcion = descripcion || rol.descripcion;
    
        await rol.update(datosActualizados);
    
        const rolActualizado = await Rol.findByPk(id);
    
        res.json(rolActualizado || datosActualizados);
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};


export const deleteRol = async (req, res) => {
    const id = req.params.id;

    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        await rol.destroy();

        res.sendStatus(204);

    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        return res.status(500).json({
            message: 'Algo fue mal' 
        });
    }
};
