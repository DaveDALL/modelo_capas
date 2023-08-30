import express from 'express'
import authController from '../controllers/auth.controller.js'
const { Router } = express
const {authRegistrationController} = authController
const authRouter = new Router()



export default authRouter