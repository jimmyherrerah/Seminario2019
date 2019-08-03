import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

import Header from '../../generics/header/Header';
import { MDBBtn } from 'mdbreact';

class NuevoUsuario extends Component {
    
    constructor(){
        super();
        this.state = {
            nombre: '',
            email: '',
            password: '',
            repit: ''
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <h2>Nuevo Usuario</h2>
                <label htmlFor="input-nombre" className="grey-text">
                Nombre:
                </label>
                <input
                type="text"
                style={{marginLeft: 33+"%"}}
                id="input-nombre"
                className="form-control col-4"
                name="nombre"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-email" className="grey-text">
                Email:
                </label>
                <input
                id="input-email"
                type="email"
                name="email"
                style={{marginLeft: 33+"%"}}
                className="md-textarea form-control col-4" 
                rows="3"
                onChange={(e) => { this.onChangeHandler(e) }}
                >
                </input>
                <label htmlFor="input-password" className="grey-text">
                Contraseña:
                </label>
                <input
                type="password"
                name="password"
                style={{marginLeft: 33+"%"}}
                id="input-password"
                className="form-control col-4"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-repit" className="grey-text">
                Repita su Contraseña:
                </label>
                <input
                type="password"
                name="repit"
                style={{marginLeft: 33+"%"}}
                id="input-repit"
                className="form-control col-4"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <div className="text-center mt-4">
                    <MDBBtn onClick={(e) => { this.onClickHandler(e); }} color="indigo" type="submit">Guardar</MDBBtn>
                </div>
            </div>
        );
    };

    onClickHandler(e){
        if(this.state.nombre === '' || this.state.rtn === '' || this.state.edad === '' || this.state.telefono === ''){
            alert("Verifique los Campos.");
            return;
        }

        if(this.state.password !== this.state.repit)
        {
            alert("Las contraseñas no coinciden.");
            return;
        }

        let datos = {};
        datos.nombre = this.state.nombre;
        datos.email = this.state.email;
        datos.password = this.state.password;

        axios.post('/api/usuarios/nuevo', datos).then(resp => {
            window.location = '/catalogo'
        }).catch(exc => { throw exc; })
    };

    onChangeHandler(e){
        const { name, value } = e.currentTarget;
        this.setState({...this.state, [name]:value});
    }
};

export default NuevoUsuario;