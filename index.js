import express from 'express'
import http from 'http'
import config from './config/config.env.js'
import Database from './scr/dao/dao.mongo.js'
import productRouter from './scr/routers/products.router.js'
import cartRouter from './scr/routers/carts.router.js'
const app = express()
const server = http.createServer(app)


const { PORT } = config

app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


server.listen(PORT, () => {
    console.log(`Server listenning at port ${PORT}`)
    Database.connect()
})