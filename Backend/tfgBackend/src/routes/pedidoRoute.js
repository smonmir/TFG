import {Router} from 'express'
import {getPedido, getPedidoById, createPedido, updatePedido, deletePedido} from '../controllers/pedidoController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/pedido', getPedido)

router.get('/pedido/:id', getPedidoById)

router.post('/pedido', createPedido)

router.patch('/pedido/:id', updatePedido)

router.delete('/pedido/:id', deletePedido)

export default router;
