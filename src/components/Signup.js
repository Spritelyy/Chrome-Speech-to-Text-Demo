import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
      e.preventDefault()

      if(passwordRef.current.value !== passwordConfirmationRef.current.value) {
        return setError("Passwords do not match")
      }

      try {
          setError('')
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          navigate("/Chrome-Speech-to-Text-Demo")
      } catch {setError("Failed to create an account")}

      setLoading(false)
  } 

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <div style={{ maxWidth: '400px'}}>
                <Card style={{ background: "#FECA72"}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email'  ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="6 characters..." type='password'  ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password_confirm">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password'  ref={passwordConfirmationRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-3 btn-dark' type='submit'>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to="/Chrome-Speech-to-Text-Demo/login" >Log In</Link>
                </div>
            </div>
        </Container>
    </>
  )
}

