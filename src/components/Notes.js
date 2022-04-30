import React, {useState, useEffect} from 'react'
import { Button, Card, Col, Container, Row  } from 'react-bootstrap'
import { Link } from "react-router-dom"
import Spline from '@splinetool/react-spline';
import { db } from "../firebase";
import { collection, addDoc} from "firebase/firestore";
import "bootstrap-icons/font/bootstrap-icons.css"
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

export default function Recordings() {

    const [isListening, setIsListening] = useState(false)  
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    const transcriptsCollectionRef = collection(db, "transcripts");
    const [newTitle, setNewTitle] = useState("")
    const [newTrans, setNewTrans] = useState("")

    const {currentUser} = useAuth()
    let navigate = useNavigate();

    useEffect(() => {
        handleListen()
    }, [isListening])

    const handleListen = () => {
        if(isListening){
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
           mic.stop()
           mic.onend = () => {
               console.log('Mic stopped')
           } 
        }
        mic.onstart = () => {
            console.log("Mic is on")
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNewTrans([...newTrans," ", note])
        setNote('')  
    }


    const createTranscript = async () => {
        await addDoc(transcriptsCollectionRef, {title: newTitle, trans: newTrans, id: currentUser.uid }); 
        console.log("saved to database") 
        navigate("/");
    }

  return (
    <>  
        <div style={{height:"100vh"}}>
            <Container fluid={true} style={{ height:"100vh"}}>
                <Row style={{height:"100vh", alignItems: "center"}}>
                    <Col>
                        <Spline style={{justifyContent: "center", objectFit: "fill"}} scene="https://prod.spline.design/ahqrBmXt5koyT8GR/scene.spline" />
                    </Col>
                    <Col >
                    <Card className="w-100" style={{ maxWidth: '400px', backgroundColor: '#FECA72'}}>
                        <Card.Body>
                        <h1>Transcribe</h1>
                        <Link to="/Chrome-Speech-to-Text-Demo/" className="btn btn-dark mt-1 mb-3">Dashboard</Link>
                        <Card>
                            <Card.Body>
                                <h2>Current Note</h2>
                                <div className='box, mb-3'>
                                    {isListening ? <span>Mic: <i class="bi bi-record-fill"></i></span> : <span>Mic: <i class="bi bi-record"></i></span>}
                                </div>    
                                <Button className="btn btn-dark mb-3" onClick={() => setIsListening(prevState => !prevState)}>Start/Stop</Button>
                                <Button className="btn btn-dark mb-3" onClick={handleSaveNote} disabled={!note}>Save Note</Button>
                                <p>{note}</p>
                            </Card.Body>    
                        </Card>
                        <Card>
                            <Card.Body>
                                <div className='box'>
                                    <h2>Notes</h2>
                                    <input placeholder='Transcript title...' onChange={(event) => {setNewTitle(event.target.value)}}></input>
                                    <Button className="btn btn-dark" onClick={createTranscript}>Save Transcript</Button>
                                    <div className='box, mt-3'>
                                    {savedNotes.map(n => (
                                        <p key={n}>{n}</p> 
                                    ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}
