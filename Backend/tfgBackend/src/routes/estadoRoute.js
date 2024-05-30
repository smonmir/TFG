import {Router} from 'express'
import {getEstado, getEstadoById, createEstado, updateEstado, deleteEstado} from '../controllers/estadoController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/estado', getEstado)

router.get('/estado/:id', getEstadoById)

router.post('/estado', createEstado)

router.patch('/estado/:id', updateEstado)

router.delete('/estado/:id', deleteEstado)

export default router;