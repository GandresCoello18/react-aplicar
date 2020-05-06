import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../App';
import Tareas from '../page/tareas';
import Editar from '../page/editar';
import 'bootstrap/dist/css/bootstrap.min.css';

const rutas = () => {
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path='/tareas' component={Tareas} />
                    <Route excat path='/editar/:id' component={Editar} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default rutas;