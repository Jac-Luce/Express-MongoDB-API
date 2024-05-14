import React from 'react';
import "../home/styles.css";
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../../contextProvider/AuthContextProvider';

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const {token, setToken} = useContext(AuthContext);

    /*const [token, setToken] = useState(localStorage.getItem("token" || "")); */

    const signInRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/signIn", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: name.toString(),
                    LastName: lastName.toString(),
                    email: email.toString(),
                    password: password.toString()
                })
            })
    
            if(response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result.token);
                setToken(result.token);
            }

        } catch (error) {
            console.error(error);
        }
        
    };

    useEffect(() => {
        if(token !== "") navigate("/home" )
    }, [token]);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row className='justify-content-md-center'>
        <Col md='4'>
            <h3>Registrati</h3>
            <Form onSubmit={signInRegister}>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Inserisci il tuo nome..'
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cognorme</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Inserisci il tuo cognome..'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Inserisci email..'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Inserisci Password..'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant='success' type='submit' className='mt-4'>Registrati</Button>
            </Form>
            <Link to="/">Hai già un account? Fai l'accesso.</Link>
        </Col>
      </Row>
    </Container>
  )
}
