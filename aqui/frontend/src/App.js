import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PrivateRoute from './componentes/generics/privateroute/PrivateRoute';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import Login from './componentes/pages/login/Login';

import Catalogo from './componentes/pages/catalogo/Catalogo';
import ProductoNew from './componentes/pages/catalogo/NuevoProducto';
import EditarProducto from './componentes/pages/catalogo/EditarProducto';

import Clientes from './componentes/pages/clientes/Clientes';
import ClienteNew from './componentes/pages/clientes/NuevoCliente';
import EditarCliente from './componentes/pages/clientes/EditarCliente';

import UsuarioNew from './componentes/pages/usuarios/NuevoUsuario';

import Carrito from './componentes/pages/carrito/Carrito';
import Salir from './componentes/generics/salir/Salir';


function Home() {
  return (<h1>Home</h1>);
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated : false,
      user: null,
      firsVerified: false
    }
    this.setAuthState = this.setAuthState.bind(this);
  }
  setAuthState(authProps){
    this.setState(authProps);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div className="Inner-app">
              <Route path="/" exact render={(p)=>(<Login {...p} auth={{...this.state, setAuthState:this.setAuthState}}/>)}/>
              <Route path="/login"  render={(p)=>(<Login {...p} auth={{...this.state, setAuthState:this.setAuthState}}/>)} />
              <PrivateRoute path="/catalogo" component={Catalogo} auth={this.state}/>
              <PrivateRoute path="/carrito" component={Carrito} auth={this.state}/>
              <PrivateRoute path="/clientes" component={Clientes} auth={this.state}/>
              <PrivateRoute path="/editarproducto" component={EditarProducto} auth={this.state}/>
              <PrivateRoute path="/editarcliente" component={EditarCliente} auth={this.state}/>
              <PrivateRoute path="/nuevoproducto" component={ProductoNew} auth={this.state}/>
              <PrivateRoute path="/nuevocliente" component={ClienteNew} auth={this.state}/>
              <PrivateRoute path="/nuevousuario" component={UsuarioNew} auth={this.state}/>
              <Route path="/salir" render={(p)=>(<Salir {...p} auth={{...this.state, setAuthState:this.setAuthState}}/>)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
