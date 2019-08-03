var uuidv4 = require('uuid/v4');
var express = require('express');
var router = express.Router();

function carritoInit(db){

var carritoModel = require('./carritoModel')(db);
var data = null; 

var carritoFormat = {
  'cliente':'',
  'producto':'',
  'descripcion':'',
  'categoria':'',
  'precio':0,
  'cantidad': 0,
  'subtotal': 0
};

/**
 * CONSULTAS A LA BASE DE DATOS
 */

router.get('/', function( req, res, next) {

  carritoModel.getAll(    
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error."});
      }
      return res.status(200).json(docs);
    }
  ); // getCarrito
});

router.get('/:cliente', function( req, res, next) {

  carritoModel.getCarrito(req.params.cliente,
    
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error."});
      }
      return res.status(200).json(docs);
    }
  ); // getCarrito
});

router.get('/producto/:producto', function( req, res, next) {
  carritoModel.getCarritoProducto(req.params.producto,
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error."});
      }
      return res.status(200).json(docs);
    }
  ); // getCarrito
});

/**
 * INSERCIONES Y MODIFICACIONES
 */
router.post('/agregar', function(req, res, next){
  var filtro = {"producto": req.body.producto, "cliente":req.body.cliente};
 carritoModel.getCarritoProducto(filtro,
                function(err, docs){
                  if(err) {
                    console.log(err);
                    return res.status(500).json({error:"Ha ocurrido un error."});
                  }
                  else{
                    var cantidad = docs.length;
                    if(cantidad > 0)
                    {
                      carritoModel.updateCarrito(req.body.producto, req.body.precio, req.body.cliente, (err, resultado)=>{
                        if(err){
                          console.log(err);
                          return res.status(500).json({"error":"No se ha podido agregar el producto al carrito."});
                        }
                        return res.status(200).json(resultado);
                      });
                    }else{
                      var carrito = Object.assign({} , carritoFormat, req.body);  
                      var subtotal = parseInt(carrito.cantidad) * parseFloat(carrito.precio);
                      carrito.subtotal = subtotal;
                    
                      carritoModel.addCarrito(carrito, (err, resultado)=>{
                        if(err){
                          console.log(err);
                          return res.status(500).json({"error":"No se ha podido agregar el producto al carrito."});
                        }
                        return res.status(200).json(resultado);
                      });// nuevoProducto
                    }

                    return cantidad;
                  }
                  
                }
              )    
  
  
});

router.delete('/eliminar/:idcarrito', function(req, res, next){
  var id = req.params.idcarrito;

  carritoModel.deleteCarrito(id, (err, resultado)=>{
    if(err){
      return res.status(500).json({"error":"Ha ocurrido un error al momento de eliminar el producto del carrito."});
    }
    return res.status(200).json(resultado);
  }); // eliminar Carrito
}); 

return router;

} // carritoInit

module.exports = carritoInit;
