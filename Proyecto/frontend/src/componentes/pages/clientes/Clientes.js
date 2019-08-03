import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Header from './../../generics/header/Header';
import Footer from './../../generics/footer/Footer';

import "./clientes.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';



function CardClientes(props){            
    return(
    <div className="row"  key={props._id}>
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <div className="card shadow p-3 mb-5 bg-white rounded">
                <div>
                    <center>
                        <h3>{props.nombre}</h3>
                    </center>
                </div>
                <div className="detalles">
                    <p className="pull-left"><b>RTN: </b> {props.rtn}</p>
                    <p className="pull-left"><b>Telefono: </b> {props.telefono}</p>
                    <p className="pull-left"><b>Edad: </b>{props.edad} años</p>
                </div>
            </div>
        </div>
        <div className="col-md-3"></div>
      
    </div>
    );
}

class Clientes extends Component {
    constructor(){
        super();
        this.state = {
          Clientes:[],
          isLoading: false,
          error: false,
        }
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    componentDidMount(){
        this.setState({isLoading:true});
        axios.get('/api/clientes')
          .then( (resp)=>{
            this.setState({Clientes:resp.data, isLoading:false});
          })
          .catch( (err)=>{
            console.log(err);
          })
        ;

    }
    
    render() {
        let listItems = [];
        if(this.state.Clientes.length > 0 ){
            listItems = this.state.Clientes.map((o, i)=>{
                return (
                <div>
                    <div className="acciones">
                        <button name="editar" data-id={o._id} className="btn btn-sm btn-warning" onClick={this.onClickHandler}><i className="fas fa-pen"></i></button>
                        <button name="comprar" data-id={o.nombre} className="btn btn-sm btn-primary" onClick={this.onClickHandler}><i className="fas fa-shopping-cart"></i></button>
                        <button name="borrar" data-id={o._id} className="btn btn-sm btn-danger" onClick={this.onClickHandler}><i className="fas fa-trash"></i></button>
                    </div>
                    <CardClientes {...o} /> 
                    <hr/>
                </div>);
            });
        }
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-5"></div>
                    <div className="col-md-2">
                        <Link to="nuevocliente"><button className="badge badge-pill badge-success btn-new"><i className="fas fa-plus align-middle"></i></button></Link>                      
                    </div>
                </div>
                <div>
                    <h3><b>Clientes</b></h3>
                </div>
                <div>
                    {listItems}
                </div>

                { (this.state.isLoading)? <div className='bouncingLoader'></div>: null }
                
                <Footer/>         
            </div>
        );
    };

    onClickHandler(e){
        e.preventDefault();
        e.stopPropagation();
        let idcliente = e.target.getAttribute('data-id');
        let accion = e.target.name;

        if (accion === "borrar")
        {
            axios.delete(`/api/clientes/eliminar/${idcliente}`)
            .then((resp)=>{
                window.location = '/clientes';          
            }).catch( (err) => {
                alert(err);
            } );
        }
        else if (accion === "comprar")
        {
            localStorage.setItem('cliente', idcliente);
            window.location = '/catalogo';
        }
        else if (accion === "editar")
        {
            localStorage.setItem('clienteEdit', idcliente);
            window.location = '/editarcliente';
        }
        
        /*
        axios.post('/api/usuarios/login',
        {...this.state}).then((resp)=>{
            alert(resp.data.msg);
            if(resp.data.msg === "Ingresado correctamente."){
              this.props.auth.setAuthState(
                {
                  "isAuthenticated": true,
                  "user": this.state.email,
                  "firstVerified": true
                }
              );
              this.setState({"redirecto": true});
            }
          }).catch( (err) => {
            alert(err);
          } );*/
          
    };
};
export default Clientes;