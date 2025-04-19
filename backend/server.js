import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// import products from './data/products.js'
dotenv.config()


import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './Routes/productRoutes.js'

const port = process.env.PORT || 5001

const app = express()


app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

connectDB()
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})