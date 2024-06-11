import {Router} from 'express'
import {getPedido, getPedidoById, getPedidosUsuario, createPedido, updatePedido, deletePedido} from '../controllers/pedidoController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = Router();

router.get('/pedido', getPedido)

router.get('/pedido/:id', getPedidoById)

router.get('/pedido/usuario/:usuarioId', getPedidosUsuario);

router.post('/pedido', createPedido)

router.patch('/pedido/:id', updatePedido)

router.delete('/pedido/:id', deletePedido)

export default router;
