import React, {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import {Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'
import {addToCart} from '../slices/cartSlice'


const ProductScreen = () => {
    const {id: productId} = useParams()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
   

    const {data:product, isLoading, error} = useGetProductsDetailsQuery(productId)
    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {isLoading ? (
        <Loader />
    ) : error ? (
        <div>{error?.data?.message || error.error}</div>
    ) : !product ? (
        <div>Product not found</div>
    ) : (
        <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>  
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Brand:</Col>
                            <Col>{product.brand}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Category:</Col>
                            <Col>{product.category}</Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Control
                                        as="select"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                        <Button className='btn-block' 
                        type='button' 
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                        >
                            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )}
    </>
  )
}

export default ProductScreen