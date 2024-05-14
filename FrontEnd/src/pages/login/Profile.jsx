import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Logout from '../../components/authentication/Logout';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contextProvider/AuthContextProvider';

export default function Profile({token, setToken}) {

    /*const {token} = useContext(AuthContext);*/

    const [data, setData] = useState({});

    const viewProfile = async () => {

        try {
            const response = await fetch("http://localhost:3001/auth/me", {
            
                headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
            });

            if(response.ok) {
                const result = await response.json();
                setData(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        viewProfile();
    }, [data]);
  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col md='6'>
                <Card>
                    <Card.Img 
                    variant='top'
                    src={data.avatar}
                    alt='Immagine profilo'
                    />
                    <Card.Body>
                        <Card.Title>{data.name} {data.LastName}</Card.Title>
                        <Card.Text>{data.dateOfBirth}</Card.Text>
                    </Card.Body>
                </Card>
                <Logout setToken={setToken}/>
            </Col>
        </Row>
    </Container>
  )
}
