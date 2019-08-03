var ObjectId = require("mongodb").ObjectID;

function usuariosModel(db){
  var lib = {};
  var usuarios = db.collection('usuarios');

  lib.getUsuarios= (handler)=>{
    usuarios.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
       );
  }

  lib.getUsuario = (email, handler)=>{
    usuarios.findOne({ "email": email}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      });
  }


  lib.addUsuario = (nuevoUsuario, handler)=>{
    usuarios.insertOne(nuevoUsuario, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    });
  }


  lib.deleteUsuario = (email, handler) => {
    usuarios.deleteOne({"email": email}, (err, result)=>{
      if(err){
        handler(err, null);
      } else {
        handler(null, result.result);
      }
    });
  
  }


  return lib;
} // usuariosModels
 module.exports = usuariosModel;
