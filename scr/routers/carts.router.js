import express from 'express'
import cartController from '../controllers/carts.controller.js'
const { Router } = express
const router = new Router()
const {getCartByIdController, newCartController, updateCartController, delProductFromCartController, deleteCartController} = cartController

router.get('/:cid', getCartByIdController)

router.post('/newCart', newCartController)

router.put('/:cid', updateCartController)

router.delete(':cid/products/:pid', delProductFromCartController)

router.delete('/cart/:cid', deleteCartController)

export default router

