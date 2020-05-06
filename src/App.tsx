import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import './App.css';
import { Link } from 'react-router-dom';
import Nav from './components/nav';
import { Helmet } from 'react-helmet';
import axios from 'axios';


const Home = () => {
  const [data, setData] = useState<any>( [] );

  useEffect( () => {
    consulta();
  }, []);


  const consulta = () => {
    const peti = async () => {
      const res = await axios.get('https://api-aplicar.herokuapp.com/api/user');
      
      setData(res.data);
    }
    peti();
  }




  const enviar = async (e: any) => {
    e.preventDefault();
  
    let nombre: String = (document.getElementById('nombre') as HTMLInputElement).value;
    let email: String = (document.getElementById('email') as HTMLInputElement).value;
    let clave: String = (document.getElementById('clave') as HTMLInputElement).value;
    let confir: String = (document.getElementById('confir-clave') as HTMLInputElement).value;
  
    if(nombre != '' || email != '' || clave != '' || confir != ''){
      if(clave == confir){
  
        const save = await axios({
          method: 'post',
          url: 'https://api-aplicar.herokuapp.com/api/user',
          data: {
            nombre,
            email,
            clave
          }
        });
      
        console.log(save);
        consulta();
        alert(save.data.mensaje);
  
      }else{
        alert('Las claves no son iguales, intentelo otra vez');
      }
    }else{
      alert('Asegurese de llenar todo los campos');
    }
  
  }



const eliminar = async (id: String) => {
  const remove = await axios({
    method: 'delete',
    url: `https://api-aplicar.herokuapp.com/api/user/${id}`,
  });

  alert(remove.data.mensaje);
  consulta();
}


  return (
    <>
      <Helmet>
        <title>Usuarios</title>
      </Helmet>

      <Container fluid className='p-4'>
        <Nav page='Usuarios' />
        
        <hr/>
        <Row className='justify-content-center'>
          <Col sm={12} md={3} className='p-3 mb-2'>
            <h3 className='text-center mb-3'>Crear nuevo usuario</h3>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" id='email' placeholder="Ingrese correo electronico" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" id='nombre' placeholder="ingrese su nombre de usuario" />
              </Form.Group>
             
              <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password" id='clave' placeholder='Ingresa tu clave, 5 o mas caracteres' />
              </Form.Group>
              
              <Form.Group controlId="formBasicCheckbox">
                <Form.Label>Confirmar Contraseña:</Form.Label>
                <Form.Control type="password" id='confir-clave' placeholder='Ingresa otra vez tu clave' />
              </Form.Group>

              <Button variant="primary" type="button" onClick={enviar}>
                Guardar
              </Button>
            </Form>

          </Col>

          <Col sm={12} md={9} className='p-3 mb-2'>
            <h3 className='text-center mb-3'>Mostrar todos los usuarios</h3>

            <Table striped bordered hover className='text-center' size="sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Clave</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map( (valor: any) => (
                    <tr key={valor._id}>
                      <td>{valor.nombre}</td>
                      <td>{valor.email}</td>
                      <td>{valor.clave}</td>
                      <td> 
                        <Button className='btn btn-danger' onClick={ () => eliminar(valor._id)}>Eliminar</Button>
                        <Link to={`/editar/${valor._id}`}><Button className='btn btn-warning'>Editar</Button></Link>
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
