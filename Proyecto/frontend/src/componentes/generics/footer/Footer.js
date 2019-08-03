import React, {Component} from 'react';

import "./Footer.css";

class Footer extends Component{
  render(){
    return (
      <div className="footer">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <p className="text-white ">Todos los derechos reservados © 2019, TEM Store HN</p>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      
    );
  }
}

export default Footer;
