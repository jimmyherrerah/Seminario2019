import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import "./Catalogo.css";
import Header from '../../generics/header/Header';
import Footer from '../../generics/footer/Footer';
import { MDBBtn } from 'mdbreact';

class NuevoProducto extends Component {
    
    constructor(){
        super();
        this.state = {
            precio: '',
            nombre: '',
            descripcion: '',
            categoria: ''
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <h2>Nuevo Producto</h2>
                <label htmlFor="input-nombre" className="grey-text">
                Nombre del producto:
                </label>
                <input
                type="text"
                style={{marginLeft: 33+"%"}}
                id="input-nombre"
                className="form-control col-4"
                name="nombre"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-descripcion" className="grey-text">
                Descripción:
                </label>
                <textarea
                id="input-descripcion"
                name="descripcion"
                style={{marginLeft: 33+"%"}}
                className="md-textarea form-control col-4" 
                rows="3"
                onChange={(e) => { this.onChangeHandler(e) }}
                >
                </textarea>
                <label htmlFor="input-categoria" className="grey-text">
                Categoria:
                </label>
                <input
                type="text"
                name="categoria"
                style={{marginLeft: 33+"%"}}
                id="input-categoria"
                className="form-control col-4"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-categoria" className="grey-text">
                Precio:
                </label>
                <input
                type="number"
                name="precio"
                style={{marginLeft: 33+"%"}}
                id="input-categoria"
                className="form-control col-4"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <div className="text-center mt-4">
                    <MDBBtn onClick={(e) => { this.onClickHandler(e); }} color="indigo" type="submit">Guardar</MDBBtn>
                </div>
                <Footer/>
            </div>
        );
    };

    onClickHandler(e){
        if(this.state.precio === '' || this.state.nombre === '' || this.state.descripcion === '' || this.state.categoria === ''){
            alert("Verifique los campos.");
            return;
        }
        axios.post('/api/productos/nuevo', {...this.state}).then(resp => {
            window.location = '/catalogo'
        }).catch(exc => { throw exc; })
    };

    onChangeHandler(e){
        const { name, value } = e.currentTarget;
        this.setState({...this.state, [name]:value});
    }
};

export default NuevoProducto;