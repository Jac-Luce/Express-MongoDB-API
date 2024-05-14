import React from 'react';
import { Card } from 'react-bootstrap';

export default function SingleAuthor({name, LastName, dateOfBirth, avatar, email}) {

 return (
    <>
        <Card className='d-flex flex-column'>
            <Card.Img 
            variant='top'
            src={avatar}
            alt='immagine autore' />
            <Card.Body className='p-2'>
                <Card.Title style={{fontSize: '15px', textAlign: 'center'}}>
                    {name} {LastName}
                </Card.Title>
                <Card.Text>
                    {dateOfBirth}
                    {email}
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}
