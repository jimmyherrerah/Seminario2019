var ObjectId = require("mongodb").ObjectID;

function carritoModel(db){
  var lib = {};
  var carrito = db.collection('carrito');

  
  lib.getAll = (handler)=>{
    carrito.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
    );
  }

  lib.getCarrito = (cliente, handler)=>{
    carrito.find({"cliente": cliente}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
    );
  }

  lib.getCarritoProducto = (filtro, handler)=>{
    carrito.find(filtro).toArray(
      (err , docs) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, docs);
        }
      }
  );
  }

  lib.addCarrito = (nuevoCarrito, handler)=>{
    nuevoCarrito.cantidad = parseInt(nuevoCarrito.cantidad);
    carrito.insertOne(nuevoCarrito, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    });
  }


  lib.deleteCarrito = (id, handler) => {
    carrito.deleteOne({"_id": ObjectId(id)}, (err, result)=>{
      if(err){
        handler(err, null);
      } else {
        handler(null, result.result);
      }
    });
  
  }

  lib.updateCarrito = (producto, precio, cliente, handler) => {
    var filter = {"producto":producto, "cliente": cliente};
    var updateStatement = {$inc :{cantidad: 1, subtotal: parseFloat(precio)}};
  
    carrito.updateOne(filter, updateStatement, (err, doc) => {
      if(err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
  
  }


  return lib;
} // Modelo carrito
 module.exports = carritoModel;
