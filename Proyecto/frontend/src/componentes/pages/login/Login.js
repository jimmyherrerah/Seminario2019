import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import { MDBBtn } from 'mdbreact';
import logo from '../../../images/logo.png';
import "./Login.css";
import axios from 'axios';
import Catalogo from '../catalogo/Catalogo';

class Login extends Component {
    //Lo primero que se ejecuta. (constructor)
    constructor(){
        super();
        this.state = {
            "email": "",
            "password": ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }//constructor.

    render() {
    
    if (localStorage.getItem('autorizado') === 'true'){
        if(typeof this.props.location.state === "undefined")
        {
          return (<Redirect to={'/catalogo'} />);
        }
        else{
          return (<Redirect to={this.props.location.state.from.pathname} />);
        }
         
    }
    return (
        <div>
            <br/>
            <h2>TEM STORE HN</h2>
            <img src={logo} alt="Logo" width="100px"></img>
            <br/>
            <br/>  
            <h4 className="font-fix-header">Iniciar sesión</h4>
            <br/>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
            Usuario
            </label>
            <input
            type="email"
            id="defaultFormLoginEmailEx"
            className="form-control"
            name="email"
            onChange={(e) => { this.onChangeHandler(e) }}
            />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
            Contraseña
            </label>
            <input
            type="password"
            id="defaultFormLoginPasswordEx"
            className="form-control"
            name="password"
            onChange={(e) => { this.onChangeHandler(e) }}
            />
            <div className="text-center mt-4">
                <MDBBtn onClick={(e) => { this.onClickHandler(e); }} color="indigo" type="submit">Ingresar</MDBBtn>
            </div>
        </div>
    );
    };

    //Almacena lo que el usuario escribio.
    onChangeHandler(e){
        const { name, value } = e.currentTarget;
        this.setState({...this.state, [name]:value});
    };//onChange.

    //Verifica que el usuario y la contrasena sean correctas.
    onClickHandler(e){
        e.preventDefault();
        e.stopPropagation();

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
              localStorage.setItem('autorizado', 'true');
              localStorage.setItem('cliente', this.state.email);
              this.setState({"redirecto": true});
            
            }
          }).catch( (err) => {
             alert('Crendenciales incorrectas.');
          } );
    };
};
export default Login;
