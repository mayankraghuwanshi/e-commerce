import React from 'react'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Products'
import axios from 'axios'
// import products from '../products'
import { GetProductsQuery } from '../slices/productsApiSlice'
import { useGetProductsQuery } from '../slices/apiSlice'

const HomeScreen = () => {
  const { data: product, isLoading, error } = useGetProductsQuery();

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <>
      {isLoading ? (<h2>Loading</h2>) : error ? (<div>error?.data?.message || error.error</div>) : (
        <><h1>Latest Product</h1>
          <Row>
            {product.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen