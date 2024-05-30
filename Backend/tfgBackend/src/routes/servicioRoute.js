import {Router} from 'express'
import {getServicio, getServicioById, createServicio, updateServicio, deleteServicio} from '../controllers/servicioController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/servicio', getServicio)

router.get('/servicio/:id', getServicioById)

router.post('/servicio', createServicio)

router.patch('/servicio/:id', updateServicio)

router.delete('/servicio/:id', deleteServicio)

export default router;

