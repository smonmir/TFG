import express from 'express'
import usuarioRoute from './routes/usuariosRoute.js'
import indexRoute from './routes/indexRoute.js'

const app = express()

const port = 3000

app.use(express.json())

app.use('/api', usuarioRoute)
app.use(indexRoute)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



