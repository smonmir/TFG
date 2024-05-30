import {Router} from 'express'
import {getRol, getRolById, createRol, updateRol, deleteRol} from '../controllers/rolController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/rol', getRol)

router.get('/rol/:id', getRolById)

router.post('/rol', createRol)

router.patch('/rol/:id', updateRol)

router.delete('/rol/:id', deleteRol)

export default router;
