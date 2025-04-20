import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../Models/productModel.js'

//@desc Fetch all products
//@routes Get /api/products
//@access public 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find(({}))
    res.json(products)
})

//@desc Fetch a products
//@routes Get /api/products/:id
//@access public 
const getProductById = asyncHandler(async (req, res)=>{
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)

    }else{
        res.status(404)
        throw new Error('resource not Found') 

    }
})

export {getProducts, getProductById}