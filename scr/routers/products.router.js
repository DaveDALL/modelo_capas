import express from 'express'
import productController from '../controllers/products.controller.js'
const { Router } = express
const router = new Router()
const {conditionalSearchProductsController, searchProductByIdController, newProductController, productUpdateController, deleteProductController} = productController

router.get('/', conditionalSearchProductsController)

router.get('/:pid', searchProductByIdController)

router.post('/newProduct', newProductController)

router.put('/updateProduct', productUpdateController)

router.delete('deleteProduct/:pid', deleteProductController)

export default router