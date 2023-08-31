import express from 'express'
import passport from 'passport'
import viewsController from '../controllers/views.controller.js'
const { Router } = express
const viewsRouter = new Router
const {userRegistrationViewController, userLoginController, userLogoutController, productViewController, cartViewController} = viewsController

viewsRouter.get('/userRegistration', userRegistrationViewController)

viewsRouter.get('/', userLoginController)

viewsRouter.get('/logout', userLogoutController)

viewsRouter.get('/products', passport.authenticate('jwtAuth', {session:false}), productViewController)

viewsRouter.get('/carts/:cid', cartViewController)


export default viewsRouter