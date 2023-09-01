import express from 'express'
import http from 'http'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import passport from 'passport'
import initializePassportGit from './config/passportGit.config.js'
import initializePassportJwt from './config/passportJwt.config.js'
import config from './config/config.env.js'
import Database from './scr/dao/dao.mongo.js'
import productRouter from './scr/routers/products.router.js'
import cartRouter from './scr/routers/carts.router.js'
import viewsRouter from './scr/routers/views.router.js'
import authRouter from './scr/routers/auth.router.js'
import githubRouter from './scr/routers/github.router.js'
import __dirname from './utils.js'
const app = express()
const server = http.createServer(app)
const { PORT, MONGO_URL, SECRET } = config

//middleware de archivos estaticos publicos, JSON y encoding
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)

//Configuración de express session y almacenamiento en MongoDB
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true
}))

//inicializar passport
app.use(passport.initialize())
initializePassportGit()
initializePassportJwt()

//middleware de router
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)

//Auth Routers
app.use('/', authRouter)
app.use ('/auth', githubRouter)


server.listen(PORT, () => {
    console.log(`Server listenning at port ${PORT}`)
    Database.connect()
})