import Product from '../models/products.model.js'

const conditionalSearchProductsService = async (conditions) => {

    let {limit, pageNum, sort, filterBy, keyword} = conditions
    let query = {}
    let searchAggregate = []
    let requiredProducts = {}
    let sorting = ((sort === 'asc') ? 1 : ((sort === 'desc' ? -1 : undefined)))
    let existence = ((filterBy === 'status') ? (keyword === 'true' ? true : false) : undefined)

    try{
        if(sort) {
            if(filterBy) {
                query[filterBy] = ((filterBy === 'status') ? existence : keyword)
                searchAggregate = await Product.aggregate([
                    {
                        $match: query
                    },
                    {
                        $sort: {price: sorting}
                    }
                ])
            }else {
                searchAggregate = await Product.find().sort({price: sorting})
            }
        }else {
            if(filterBy) {
                query[filterBy] = ((filterBy === 'status') ? existence : keyword)
                console.log(query)
                searchAggregate = await Product.aggregate([
                    {
                        $match: query
                    }
                ])
            }else {
                searchAggregate = await Product.find()
            }
        }

        if(limit && pageNum) {
            const options = {
                limit: Number(limit),
                page: Number(pageNum)
            }

            requiredProducts = await Product.aggregatePaginate(searchAggregate, options).then(results => {
                return results
            }).catch(err => {
                console.log('No es posible realizar paginate ' + err)
                return {}
            })
        }else {
            requiredProducts = {
                docs: searchAggregate,
                page: 1,
                totalPages: 1,
                hasPrevPage: false,
                hasNextPage: false,
                prevPage: null,
                nextPage: null,
            }
        }

        return requiredProducts
      

    }catch(err) {
        console.log('No es posible realizar el aggregate y paginación ' + err)
    }
}


const searchProductByIdService = async (pid) => {
    try {
        let foundProduct = await Product.findOne({_id: pid})
        if(foundProduct) {
            return foundProduct
        } else return {}
    }catch(err) {
        console.log('No es posible obtener el producto con mongoose' + err)
    }
}

const newProductService = async (newProduct) => {
    try{
        let {code, title, description, thumbnails, price, stock, status, category} = newProduct
        if(!code || !title || !description || !thumbnails || !price || !stock || !category) {
            throw new Error('Los campos no se encuentran completos')
        }
        else {
            let productCreatedResult = await Product.create({
                code,
                title,
                description,
                thumbnails,
                price,
                stock,
                status,
                category
            })
            return productCreatedResult
        }
    }catch(err) {
        console.log('No es posible crear el producto con mongoose ' + err)
    }
}

const productUpdateService = async (productToUpdate) => {
    try {
        if(!productToUpdate.pid || !productToUpdate.code || !productToUpdate.title || !productToUpdate.description || !productToUpdate.thumbnails || !productToUpdate.price || !productToUpdate.stock || !productToUpdate.category)
            throw new Error('Los campos del producto enviado no se encuentran completos')
        let productUpdatedResult = await Product.updateOne({_id: pid}, productToUpdate)
        return productUpdatedResult
    }catch(err) {
        console.log('No es posible actualizar el producto con mongoose ' + err)
    }
}

const deleteProductService = async (pid) => {
    try {
        let productDeletedResult = await Product.deleteOne({_id: pid})
        return productDeletedResult
    }catch(err) {
        console.log('No es posible eliminar el producto con mongoose ' + err)
    }
}


export default {
    conditionalSearchProductsService,
    searchProductByIdService,
    newProductService,
    productUpdateService,
    deleteProductService
}