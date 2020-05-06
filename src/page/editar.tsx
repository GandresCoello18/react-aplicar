import React, { useEffect, useState } from 'react';
import Nav from '../components/nav';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


const Editar = () => {
    const [data, setData] = useState<any>( [] );
    const [parametro, setParmt] = useState<any>( '00' );
    

    const { id } = useParams();
    const history = useHistory();

    useEffect( () => {
        setParmt(id);
        consulta(id);
      }, []);

const consulta = (id: String) => {
    const peti = async () => {
        const res = await axios.get(`https://api-aplicar.herokuapp.com/api/user/${id}`);
        
        setData(res.data);
      }
      peti();
}
      
      

const cambiar = async (parametro: String) => {
    
    let new_nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    let new_email = (document.getElementById('email') as HTMLInputElement).value;

    if(new_nombre != '' || new_email != ''){
        const edit = await axios({
            method: 'put',
            url: `https://api-aplicar.herokuapp.com/api/user/${parametro}`,
            data: {
                nombre: new_nombre,
                email: new_email
            }
        });

        alert(edit.data.mensaje);
        history.push('/');
    }else{
        alert('No se detectaron cambios');
    }
}

    return(
        <>      
            <Helmet>
                <title>Usuarios</title>
            </Helmet>
            
            <Container fluid className='p-4'>
                <Nav page='Editar User' />
                
                <hr/>
                <Row className='justify-content-center'>
                    <Col sm={12} md={4} className='p-3 mb-2'>
                        
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Cambiar Email:</Form.Label>
                                <Form.Control type="email" id='email' placeholder={data.map( (valor: any) => valor.email)} defaultValue={data.map( (valor: any) => valor.email)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Cambiar Nombre:</Form.Label>
                                <Form.Control type="text" id='nombre' placeholder={data.map( (valor: any) => valor.nombre)} defaultValue={data.map( (valor: any) => valor.nombre)} />
                            </Form.Group>

                            <Button variant="primary" type="button" onClick={ () => cambiar(parametro)}>
                                Guardar cambios
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Editar;