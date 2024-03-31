import {pool} from '../../db/db.js'


export const getUsuario = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuario;')
    res.json(rows)
}

export const getUsuarioById = async (req, res) => {
    console.log(req.params.id)
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [req.params])

    if(rows.length <= 0){
        return res.status(404).json({
            message: "Usuario no encontrado"
        })
    }

    res.json(rows[0])
}


export const createUsuario = async (req, res) => {
    const {nombre, email, telefono, direccion} = req.body
    const [rows] = await pool.query('INSERT INTO usuario (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)', [nombre, email, telefono, direccion])
    res.send({
        id: rows.insertId,
        nombre,
        email,
        telefono,
        direccion
    })
}


export const updateUsuario = (req, res) => {
    res.send("Actualizando usuario")
}


export const deleteUsuario = (req, res) => {
    res.send("Eliminando usuario")
}