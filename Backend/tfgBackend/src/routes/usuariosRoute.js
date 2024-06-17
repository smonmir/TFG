import {Router} from 'express'
import {enviarCodigoVerificacion, verificarCodigo, createUsuario, login, getUsuario, getMe, getUsuarioById, updateUsuario, deleteUsuario} from '../controllers/usuariosController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/usuario', getUsuario)

//router.get('/usuario/:id', getUsuarioById)

router.get('/usuario/me', authMiddleware, getMe); //Para ver si el usuario ya esta logueado

router.post('/usuario/login', login)

router.post('/usuario', createUsuario)

router.post('/usuario/codigo/enviarCodigo', enviarCodigoVerificacion);

router.post('/usuario/verificarCodigo', verificarCodigo);

router.patch('/usuario/:id', updateUsuario)

router.delete('/usuario/:id', deleteUsuario)

export default router;

