var ObjectId = require("mongodb").ObjectID;

function clientesModel(db){
  var lib = {};
  var clientes = db.collection('clientes');

  lib.getClientes = (handler)=>{
    clientes.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
       );
  }

  lib.getCliente = (idCliente, handler)=>{
    clientes.findOne({ "_id": new ObjectId(idCliente)}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      });
  }

  lib.getPorCategoria = (categoria, handler)=>{
    clientes.find({"categoria": categoria}).toArray(
      (err , resultado) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, resultado);
        }
      }
     );
  }


  lib.addCliente = (nuevoProducto, handler)=>{
    clientes.insertOne(nuevoProducto, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    });
  }

  lib.updateCliente = (cliente, id, handler) => {
    var filter = {"_id": ObjectId(id)};
    cliente.fecha_ingreso = new Date();
    var updateStatement = {$set: cliente}
    // get filered document
    clientes.updateOne(filter, updateStatement, {upsert:true}, (err, doc) => {
      if(err) {
        handler(err, null);
      } else {
        handler(null, doc);
      }
    });
  }

  lib.deleteCliente = (id, handler) => {
    clientes.deleteOne({"_id": ObjectId(id)}, (err, result)=>{
      if(err){
        handler(err, null);
      } else {
        handler(null, result.result);
      }
    });
  
  }


  return lib;
} // clientesModel
 module.exports = clientesModel;
