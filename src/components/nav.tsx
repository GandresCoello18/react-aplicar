import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

interface Props {
    page: String | any
}

const Nav = ( props: Props ) => {
    return(
        <>
            <Row>
                <Col>
                    <h1>{props.page}</h1>
                </Col>
                <Col>
                    <Navbar expand="lg" variant="light" bg="light">
                    
                        <Container>
                            
                            <Navbar.Brand>
                            <Link to='/'>
                                    Inicio
                            </Link>
                            </Navbar.Brand>

                            <Navbar.Brand>
                            <Link to='/tareas'>
                                    Tareas
                            </Link>
                            </Navbar.Brand>

                        </Container>
                    </Navbar>
                </Col>
            </Row>
        </>
    );
}

export default Nav;