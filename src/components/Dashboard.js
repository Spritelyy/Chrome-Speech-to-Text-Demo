import React, { useState, useEffect } from 'react'
import { Card, Button, Alert, Container, Accordion } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { db } from "../firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    const [transcripts, setTranscripts] = useState([]); 
    const transcriptsCollectionRef = collection(db, "transcripts");

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate("/login")
        } catch {
            setError('Failed to log out')
        }

    }

    useEffect(() => {

      const getTranscripts = async () => {
        const data = await getDocs(transcriptsCollectionRef);
        setTranscripts(data.docs.map((doc) => ({...doc.data(), author: doc.id })));
      }
      getTranscripts();
    }, [])

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
      <div style={{ maxWidth: '400px', justifyItems: "center"}}>
        <Card  style={{ background: "#FECA72"}}>
          <Card.Body>
            <h1 className='text-center mb-2'>Dashboard</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className='w-100 text-center mb-4'>
                <strong>Signed in as:</strong> {currentUser.email}
              </div>
              <div class="d-flex justify-content-center">
                <Link to="/notes" className="btn btn-dark w-50 mb-3">Notes</Link>
              </div>
          <Container>
            <Card >
              <Card.Body>
                <h2 className='text-center' >Saved Transcripts</h2>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Welcome!</Accordion.Header>
                    <Accordion.Body>This is where all of your saved transcripts will appear.</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {transcripts.map((trans) => { return <div>
                 {trans.id === currentUser.uid && ( 
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header >{trans.title}</Accordion.Header>
                      <Accordion.Body>{trans.trans}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>)}
                </div>})}
              </Card.Body>
          </Card>
          </Container>
          <div className='w-100 text-center mt-2'>
            <Button variant='dark' onClick={handleLogout}>Log Out</Button> 
          </div>
          </Card.Body>
        </Card>
      </div>
    </Container>    
  )
}


