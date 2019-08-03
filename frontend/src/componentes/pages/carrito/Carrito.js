/* carrito */
import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Header from './../../generics/header/Header';
import Footer from './../../generics/footer/Footer';
import DataTable from 'react-data-table-component';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import FloatingButton from '../../generics/addbutton/FloatingButton';

import "./Carrito.css";
import NuevoUsuario from '../usuarios/NuevoUsuario';

const columns = [
    {
        name: 'ID',
        visible: false,
        selector: '_id'
    },
    {
        name: 'Cliente',
        selector: 'cliente',
        sortable: true,
    },
    {
        name: 'Producto',
        selector: 'producto',
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: 'descripcion',
        sortable: true,
        right: true,
    },
    {
        name: 'Categoria',
        selector: 'categoria',
        sortable: true,
        right: true,
    },
    {
        name: 'Precio',
        selector: 'precio',
        sortable: true,
        right: true,
    },
    {
        name: 'Cantidad',
        selector: 'cantidad',
        sortable: true,
        right: true,
    },
    {
        name: 'Subtotal',
        selector: 'subtotal',
        sortable: true,
        right: true,
    },
];

function formatearNumero(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;

    //
}

 const handleChange = (state) => {
    if(localStorage.getItem('borrar')==='true')
    {
        let id = state.selectedRows[0]._id;

        axios.delete(`/api/carrito/eliminar/${id}`)
            .then((resp)=>{
                localStorage.setItem('borrar', 'false');
                window.location = '/carrito';          
            }).catch( (err) => {
                alert(err);
            } );

    }
    console.log(state.selectedRows);
  };


class Carrito extends Component {
    constructor(){
        super();
        this.state = {
          carrito:[],
          isLoading: false,
          error: false,
          show: false,
          suma: 0.00,
          cliente: localStorage.getItem('cliente'),
          seleccionados: []
        }
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
      

    }
    componentDidMount(){
        this.setState({isLoading:true});
        axios.get(`/api/carrito/${this.state.cliente}`)
          .then( (resp)=>{
            this.setState({carrito:resp.data, isLoading:false});
          })
          .catch( (err)=>{
           console.log(err);
          })
        ;
    }
    
    render() {
        let listItems = [];
        localStorage.setItem('cantidad', this.state.carrito.length);
        if(this.state.carrito.length > 0 ){
            listItems = this.state.carrito.map((o, i)=>{
                this.state.suma = this.state.suma + o.subtotal;
            });
        }
        return (
            <div>
                <Header/>
                <div>
                    <h3><b>Carrito</b></h3>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <DataTable
                            title={this.state.cliente}
                            columns={columns}
                            data={this.state.carrito}
                            selectableRows // add for checkbox selection
                            onTableUpdate={handleChange}
                        />
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <h5 className="mr-5" align="right">Total: L.<span>{formatearNumero(this.state.suma)}</span></h5>
                    </div>
                    <div className="col-md-2">
                        <Button variant="danger" className="btn btn-sm badge-pill" onClick={this.handleShow}><i className="fas fa-trash"></i></Button>
                    </div>
                </div>

                { (this.state.isLoading)? <div className='bouncingLoader'></div>: null }

                
                
                <Footer/>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro de desear eliminar un producto?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="default" onClick={this.handleClose}>
                        Cancelar
                        </Button>
                        <Button variant="danger" onClick={this.onClickHandler}>
                        Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>         
            </div>
        );
    };

    onClickHandler(e){
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem('borrar', 'true');
        this.setState({ show: false });
       
    };

    handleClose() {
        localStorage.setItem('borrar', 'false');
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }
    
};
export default Carrito;


