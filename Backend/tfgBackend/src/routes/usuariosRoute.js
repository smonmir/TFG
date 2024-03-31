import {Router} from 'express'
import {createUsuario, deleteUsuario, getUsuario, getUsuarioById, updateUsuario} from '../controllers/usuariosController.js'

const router = Router();

router.get('/usuario', getUsuario)

router.get('/usuario/:id', getUsuarioById)

router.post('/usuario', createUsuario)

router.put('/usuario', updateUsuario)

router.delete('/usuario', deleteUsuario)

export default router;

