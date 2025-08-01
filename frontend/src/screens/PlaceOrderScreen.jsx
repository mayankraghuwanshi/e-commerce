import React from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import CheckOutSteps from '../components/CheckOutSteps'

const PlaceOrderScreen = () => {
  return (
    <FormContainer>
        <CheckOutSteps step1={true} step2={true} step3={true} step4={true} />
        <h1>Place Order</h1>
        <Form>
            <Form.Group controlId='orderSummary'>
                <Form.Label>Order Summary</Form.Label>
                <div>Your order details will appear here</div>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Place Order
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PlaceOrderScreen 