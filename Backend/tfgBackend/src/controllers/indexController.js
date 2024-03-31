import {pool} from '../../db/db.js'

export const ping = async (req, res) => {
    const [result] = await pool.query('SELECT "Pong" AS result;')
    res.json(result[0])
}