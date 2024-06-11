import {Router} from 'express'
import {getServicio, getServicioById, getServiciosUsuario, createServicio, updateServicio, deleteServicio, getServiciosPaginados} from '../controllers/servicioController.js'
import {upload} from '../middleware/uploadMiddleware.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/servicio', getServicio)

//router.get('/servicio/:id', getServicioById)

router.get('/servicio/paginados', getServiciosPaginados);

router.get('/servicio/usuario/:usuarioId', getServiciosUsuario);

router.post('/servicio', upload.single('imagen'), createServicio)

router.patch('/servicio/:id', updateServicio)

router.delete('/servicio/:id', deleteServicio)

export default router;

