import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert, Container} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
      e.preventDefault()

      try {
          setError('')
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          navigate("/Chrome-Speech-to-Text-Demo/")
      } catch {setError("Failed to log in")}

      setLoading(false)
  } 

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <div style={{ maxWidth: '400px'}}>
                <Card style={{ background: "#FECA72"}}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email'  ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password'  ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-3 btn-dark' type='submit'>Log In</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to="/Chrome-Speech-to-Text-Demo/forgot-password" style={{ color: "#000"}}>Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/Chrome-Speech-to-Text-Demo/signup" >Sign Up</Link>
                </div>
            </div>
        </Container>
    </>
  )
}
