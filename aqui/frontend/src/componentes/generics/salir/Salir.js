import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Salir extends Component {
    constructor(){
        super();
       
    }

    render() {
        axios.get('/api/usuarios/logout',
        {...this.state})
        .then(()=>{            
            this.props.auth.setAuthState(
            {
                "isAuthenticated": false,
                "user": null,
                "firstVerified": false
            });              
            
        });
        localStorage.setItem('autorizado', false);
        return (<Redirect to={'/login'} />);
        
    };

    
};
export default Salir;
