var ObjectId = require("mongodb").ObjectID;

function productosModel(db){
  var lib = {};
  var productos = db.collection('productos');

  lib.getProductos = (handler)=>{
      productos.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
       );
  }

  lib.getProducto = (idProducto, handler)=>{
    productos.findOne({ "_id": new ObjectId(idProducto)}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      });
  }

  lib.getPorCategoria = (categoria, handler)=>{
    productos.find({"categoria": categoria}).toArray(
      (err , resultado) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, resultado);
        }
      }
     );
  }


  lib.addProducto = (nuevoProducto, handler)=>{
    nuevoProducto.precio = parseFloat(nuevoProducto.precio);
    productos.insertOne(nuevoProducto, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    });
  }


  lib.updateProducto = (producto, id, handler) => {
    var filter = {"_id": ObjectId(id)};
    producto.fechaIngreso = new Date();
    producto.precio = parseFloat(producto.precio);
    var updateStatement = {$set: producto}
    // get filered document
    productos.updateOne(filter, updateStatement, {upsert:true}, (err, doc) => {
      if(err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
  }

  lib.deleteProducto = (id, handler) => {
    productos.deleteOne({"_id": ObjectId(id)}, (err, result)=>{
      if(err){
        handler(err, null);
      } else {
        handler(null, result.result);
      }
    });
  
  }


  return lib;
} // productosModel
 module.exports = productosModel;
