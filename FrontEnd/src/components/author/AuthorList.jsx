import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contextProvider/AuthContextProvider';
import SingleAuthor from './SingleAuthor';

export default function AuthorList({token}) {

    /*const {token} = useContext(AuthContext);*/

    const [authors, setAuthors] = useState([]);

    const authorResults = async () => {
        try {
            const response = await fetch("http://localhost:3001/authors", {
                method:"GET",
                headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
            });

            if(response.ok) {
                const result = await response.json();
                setAuthors(result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        authorResults();
    }, []);

  return (
    <Container>
        <Row>
            <Col md='8'>
                <Row className='g-2'>
                    {
                        authors.map((author) => {
                            return (
                                <Col xs='12' md='4' key={author._id}>
                                    <SingleAuthor author={author}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
        </Row>
    </Container>
  )
}
