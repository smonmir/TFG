import {Router} from 'express'
import {login, getUsuario, getMe, getUsuarioById, createUsuario, updateUsuario, deleteUsuario} from '../controllers/usuariosController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/usuario', getUsuario)

//router.get('/usuario/:id', getUsuarioById)

router.get('/usuario/me', authMiddleware, getMe); //Para ver si el usuario ya esta logueado

router.post('/usuario/login', login)

router.post('/usuario', createUsuario)

router.patch('/usuario/:id', updateUsuario)

router.delete('/usuario/:id', deleteUsuario)

export default router;

