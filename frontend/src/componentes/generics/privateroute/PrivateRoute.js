import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
function PrivateRoute( {component: Component, ...rest} ){
  const { auth } = rest;
  return (
    <Route
      {...rest}
      render={ (props) => { return localStorage.getItem('autorizado') === "true" ?
          (<Component {...props}/>) :
          (<Redirect to={{pathname:"/login", state:{ from: props.location}}} />);
       }
      }
   />);
}
export default PrivateRoute;
