import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

import logo from '../../../images/logo.png';
import axios from 'axios';
import "./Header.css";

class Header extends Component {
  constructor(){
    super();
    this.state = {
      cliente: localStorage.getItem('cliente')
    }
  
}
componentDidMount(){
    axios.get(`/api/carrito/${this.state.cliente}`)
      .then( (resp)=>{
        localStorage.setItem('cantidad', resp.data.length);
      })
      .catch( (err)=>{
        alert("No autorizado");
      })
    ;
}

  render() {
    let cantidadCarrito = localStorage.getItem('cantidad');
    return (
      <div className="row clearfix">     
          <Navbar collapseOnSelect className="header justify-content-between" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <Image className="logo" width="50px" src={logo} rounded />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

              <Nav.Link href="#"><Link className="text-white" to="clientes">Clientes</Link></Nav.Link>
              <Nav.Link href="#"><Link className="text-white" to="catalogo">Catálogo</Link></Nav.Link>
              <Nav.Link href="#"><Link className="text-white" to="carrito">Carrito</Link><span class="badge badge-light align-middle counter">{cantidadCarrito}</span></Nav.Link>

              
            </Nav>
            <Nav>
                
                <NavDropdown title="Opciones" id="collasible-nav-dropdown">
                  <NavDropdown.Item href=""><Link className="text-black" to="nuevousuario">Nuevo Usuario</Link></NavDropdown.Item>
                  <NavDropdown.Item href=""><Link className="text-black" to="carrito">Ver Carrito</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                
                  <NavDropdown.Item href="#"><Link to="salir">Cerrar Sesión</Link></NavDropdown.Item>
                </NavDropdown>
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
     
    </div>
    );
    };
};
export default Header;
