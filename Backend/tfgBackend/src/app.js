import express from 'express'
import cors from 'cors'
import usuarioRoute from './routes/usuariosRoute.js'
import rolRoute from './routes/rolRoute.js'
import pedidoRoute from './routes/pedidoRoute.js'
import estadoRoute from './routes/estadoRoute.js'
import servicioRoute from './routes/servicioRoute.js'
import valoracionRoute from './routes/valoracionRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', usuarioRoute)
app.use('/api', rolRoute)
app.use('/api', pedidoRoute)
app.use('/api', estadoRoute)
app.use('/api', servicioRoute)
app.use('/api', valoracionRoute)

app.use((req, res) => {
    res.status(404).json({
        message: "endpoint not found"
    })
})


export default app;