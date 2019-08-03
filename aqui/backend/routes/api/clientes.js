var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

function clientesInit(db){

var fileModel = require('./jsonmodel');
var clientesModel = require('./clientesModel')(db);
var data = null; 

var clienteFormat = {
  'nombre':'',
  'rtn':'',
  'telefono':'',
  'edad':0,
  'fecha_ingreso': null
};

/**
 * CONSULTAS A LA BASE DE DATOS
 */
router.get('/', function( req, res, next) {

    clientesModel.getClientes(
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error al obtener los clientes."});
      }
      return res.status(200).json(docs);
    }
  ); // getClientes
});

router.get('/cliente/:idcliente', (req, res, next)=>{
  clientesModel.getCliente(req.params.idcliente, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el cliente."});
    }
    return res.status(200).json(resultado);
  } );//getCliente
}); 

router.get('/categoria/:categoria', (req, res, next)=>{
    clientesModel.getPorCategoria(req.params.categoria, (err, docs)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se encontraron productos de esa categoría"});
    }else{
      return res.status(200).json(docs);
    }
  } ); //getPorCategoria
});

/**
 * INSERCIONES Y MODIFICACIONES
 */
router.post('/nuevo', function(req, res, next){
  var cliente = Object.assign({} , clienteFormat, req.body);
  var fechaIngreso = new Date();

  cliente.fecha_ingreso = fechaIngreso;
 
  // Mongo Model
  clientesModel.addCliente(cliente, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido agregar el cliente."});
    }
    return res.status(200).json(resultado);
  });// nuevoCliente
});

router.put('/actualizar/:idcliente', function(req, res, next){
  var id = req.params.idcliente;
  var cliente = Object.assign({} , clienteFormat, req.body);
  clientesModel.updateCliente(cliente, id, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido actualizar el cliente."});
    }
    return res.status(200).json(resultado);
  }); // updateCliente
});

router.delete('/eliminar/:idcliente', function(req, res, next){
  var id = req.params.idcliente;
  clientesModel.deleteCliente(id, (err, resultado)=>{
    if(err){
      return res.status(500).json({"error":"No se ha podido eliminar el cliente."});
    }
    return res.status(200).json(resultado);
  }); // deleteCliente
}); 

return router;

} // productosInit

module.exports = clientesInit;
