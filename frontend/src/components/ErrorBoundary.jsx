import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'
import { useRouteError, useNavigate } from 'react-router-dom'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Oops! Something went wrong</Alert.Heading>
        <p>
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button 
            variant="outline-danger" 
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </Alert>
    </Container>
  )
}

export default ErrorBoundary 