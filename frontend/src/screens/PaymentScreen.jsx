import React from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import CheckOutSteps from '../components/CheckOutSteps'

const PaymentScreen = () => {
  return (
    <FormContainer>
        <CheckOutSteps step1={true} step2={true} step3={true} />
        <h1>Payment Method</h1>
        <Form>
            <Form.Group controlId='paymentMethod'>
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Check type='radio' label='PayPal or Credit Card' />
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen 