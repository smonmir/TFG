import {Router} from 'express'
import {getValoracion, getValoracionesPorServicio, createValoracion, updateValoracion, deleteValoracion} from '../controllers/valoracionController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/valoracion', getValoracion)

router.get('/valoracion/:servicioId', getValoracionesPorServicio);

router.post('/valoracion', createValoracion)

router.patch('/valoracion/:id', updateValoracion)

router.delete('/valoracion/:id', deleteValoracion)

export default router;

