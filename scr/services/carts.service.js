import Cart from '../models/carts.model.js'

const getCartById = async (cid) => {
    try {
        let cart = await Cart.findOne({_id: cid})
        if(cart){
            return cart
        }else throw new Error('No existe el cart en la base de datos')
    }catch(err) {
        console.log('No es posible obtener el cart con mongoose' + err)
    }
}

const newCartService = async () => {
    try{
        let cartCreatedResult = await Cart.create({
            products: []
        })
        return cartCreatedResult
    }catch(err) {
        console.log('No es posible crear el cart con mongoose ' + err)
    }
}

const updateCartService = async (cid, productId, qty) => {
    try {
        let foundCart = await Cart.find({_id: cid})
        let products = foundCart[0].products
        let foundProduct = products.find(product => product.productId.equals(productId))
        if(foundProduct) {
            let updatedCartResult = await Cart.updateOne({_id: cid, 'products.productId': productId}, {$set: {'products.$.qty': qty + foundProduct.qty}})
            return updatedCartResult
        }else {
            let updatedCartResult = await Cart.updateOne({_id: cid}, {$push: {products: {productId: productId, qty: qty}}})
            return updatedCartResult
        }
    }catch(err) {
        console.log('No es posible actualizar el cart con mongoose ' + err)
    }
}

const delProductFromCartService = async (cid, pid) => {
    try {
        let foundCart = await Cart.find({_id: cid})
        let products = foundCart[0].products
        let foundProduct = products.find(product => product.productId.equals(pid))
        if(foundProduct) {
            let updatedCartResult = await Cart.updateOne({_id: cid}, {$pull: {products: {productId: pid}}})
            return updatedCartResult
        }
    }catch(err) {
        console.log('No es posible borrar el producto medante mongoose ' + err)
    }
}

const deleteCartService = async (cid) => {
    try {
        let deletedCartResult = await Cart.deleteOne({_id: cid})
        return deletedCartResult
    }catch(err) {
        console.log('No es posible borrar el cart con mongoose '+ err)
    }
}

export default {
    getCartById,
    newCartService,
    updateCartService,
    delProductFromCartService,
    deleteCartService
}