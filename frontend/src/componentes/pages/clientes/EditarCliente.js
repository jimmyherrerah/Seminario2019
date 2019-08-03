import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import "./clientes.css";
import Header from '../../generics/header/Header';
import Footer from '../../generics/footer/Footer';
import { MDBBtn } from 'mdbreact';

class EditarCliente extends Component {
    
    constructor(){
        super();
        this.state = {
            nombre: '',
            rtn: '',
            telefono: '',
            edad: ''
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount(){
        this.setState({isLoading:true});
        axios.get(`/api/clientes/cliente/${localStorage.getItem('clienteEdit')}`)
          .then( (resp)=>{
            this.setState(
                {nombre:resp.data.nombre, 
                rtn:resp.data.rtn, 
                telefono:resp.data.telefono, 
                edad: resp.data.edad,
                isLoading:false});
          })
          .catch( (err)=>{
            alert(err);
          });
    }
    
    render() {
        return (
            <div>
                <Header/>
                <br/>
                <h2>Editar Cliente</h2>
                <label htmlFor="input-nombre" className="grey-text">
                Nombre del cliente:
                </label>
                <input
                type="text"
                style={{marginLeft: 33+"%"}}
                id="input-nombre"
                className="form-control col-4"
                name="nombre"
                value={this.state.nombre}
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-rtn" className="grey-text">
                RTN
                </label>
                <input
                id="input-rtn"
                name="rtn"
                value={this.state.rtn}
                maxLength="14"
                style={{marginLeft: 33+"%"}}
                className="md-textarea form-control col-4" 
                rows="3"
                onChange={(e) => { this.onChangeHandler(e) }}
                >
                </input>
                <label htmlFor="input-edad" className="grey-text">
                Edad:
                </label>
                <input
                type="number"
                name="edad"
                value={this.state.edad}
                style={{marginLeft: 33+"%"}}
                id="input-edad"
                className="form-control col-4"
                onChange={(e) => { this.onChangeHandler(e) }}
                />
                <label htmlFor="input-telefono" className="grey-text">
                Telefono:
                </label>
                <input
                type="text"
                name="telefono"
                value={this.state.telefono}
                style={{marginLeft: 33+"%"}}
                id="input-telefono"
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
        if(this.state.nombre === '' || this.state.rtn === '' || this.state.edad === '' || this.state.telefono === ''){
            alert("Verifique los Campos.");
            return;
        }

        axios.put(`/api/clientes/actualizar/${localStorage.getItem('clienteEdit')}`, {...this.state}).then(resp => {
            window.location = '/clientes'
        }).catch(exc => { throw exc; })
    };

    onChangeHandler(e){
        const { name, value } = e.currentTarget;
        this.setState({...this.state, [name]:value});
    }
};

export default EditarCliente;