var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

function productosInit(db){

var fileModel = require('./jsonmodel');
var productosModel = require('./productosModel')(db);
var data = null; 

var productoFormat = {
  'nombre':'',
  'descripcion':'',
  'categoria':'',
  'precio':0,
  'fechaIngreso': null
};

/**
 * CONSULTAS A LA BASE DE DATOS
 */
router.get('/', function( req, res, next) {

  productosModel.getProductos(
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error."});
      }
      return res.status(200).json(docs);
    }
  ); // getProductos
});

router.get('/producto/:idproducto', (req, res, next)=>{
  productosModel.getProducto(req.params.idproducto, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el producto."});
    }
    return res.status(200).json(resultado);
  } );//getProducto
}); 

router.get('/categoria/:categoria', (req, res, next)=>{
  productosModel.getPorCategoria(req.params.categoria, (err, docs)=>{
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
  var producto = Object.assign({} , productoFormat, req.body);
  var fechaIngreso = new Date();

  producto.fecha_ingreso = fechaIngreso;
 
  // Mongo Model
  productosModel.addProducto(producto, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido agregar el producto."});
    }
    return res.status(200).json(resultado);
  });// nuevoProducto
});

router.put('/actualizar/:idproducto', function(req, res, next){
  var id = req.params.idproducto;
  var producto = Object.assign({} , productoFormat, req.body);
  productosModel.updateProducto(producto, id, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido actualizar el producto."});
    }
    return res.status(200).json(resultado);
  }); // updateProducto
});

router.delete('/eliminar/:idproducto', function(req, res, next){
  var id = req.params.idproducto;
  productosModel.deleteProducto(id, (err, resultado)=>{
    if(err){
      return res.status(500).json({"error":"No se ha podido eliminar el producto."});
    }
    return res.status(200).json(resultado);
  }); // deleteProducto
}); 

return router;

} // productosInit

module.exports = productosInit;
