import React from 'react';
import { Helmet } from 'react-helmet';
import Nav from '../components/nav';
import { Container, Row, Col } from 'react-bootstrap';

const Tareas = () => {
    return(
        <>
            <Helmet>
                <title>Tareas</title>
            </Helmet>
            
            <Nav page='Tareas' />

            <Container fluid className='p-4'>
                <Row className='justify-content-center'>

                </Row>
            </Container>
        </>
    );
}

export default Tareas;