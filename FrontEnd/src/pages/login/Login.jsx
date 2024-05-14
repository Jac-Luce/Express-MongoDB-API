import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../home/styles.css";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contextProvider/AuthContextProvider';
import { useState, useContext, useEffect } from 'react';
import GoogleAuth from '../../components/authentication/GoogleAuth';

export default function Login({token, setToken}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   /* const [token, setToken] = useState(localStorage.getItem("token" || ""));*/
    const navigate = useNavigate();

    /* const {token, setToken} = useContext(AuthContext);*/

    const signInLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    email: email.toString(),
                    password: password.toString()
                })
            });
    
            if(response.ok) {
                const result = await response.json();
                console.log(result);
                localStorage.setItem("token", result.token);
                setToken(result.token);
            }

        } catch (error) {
            console.error(error);
        }
        
    };

   useEffect(() => {
        if(token !== "") navigate("/me" + token)
    }, [token]); 

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <Row className='justify-content-md-center'>
        <Col md='4'>
            <h3>Effettua il Login</h3>
            <Form onSubmit={signInLogin}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Inserisci Email..'
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
                <Button variant='success' type='submit' className='mt-4'>Login</Button>
            </Form>
            <Link to="/signIn">Non sei ancora registrato? Registrati.</Link>
            <GoogleAuth />
        </Col>
      </Row>
    </Container>
  )
}
