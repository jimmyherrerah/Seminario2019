var uuidv4 = require('uuid/v4');
var express = require('express');
var md5 = require('md5');

var router = express.Router();

function usuariosInit(db){

var usuariosModel = require('./usuariosModel')(db);
var data = null; 

var usuarioFormat = {
  'nombre':'',
  'email':'',
  'password':'',
  'fecha_ingreso': null
};

/**
 * CONSULTAS A LA BASE DE DATOS
 */
router.get('/', function( req, res, next) {

  usuariosModel.getUsuarios(
    function(err, docs){
      if(err) {
        console.log(err);
        return res.status(500).json({error:"Ha ocurrido un error al obtener los usuarios."});
      }
      return res.status(200).json(docs);
    }
  ); // getUsuarios
});

router.get('/usuario/:email', (req, res, next)=>{
  usuariosModel.getUsuario(req.params.email, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el usuario."});
    }
    return res.status(200).json(resultado);
  } );//getUsuario
}); 


/**
 * INSERCIONES Y MODIFICACIONES
 */
router.post('/nuevo', function(req, res, next){
  var usuario = Object.assign({} , usuarioFormat, req.body);
  
  var fechaIngreso = new Date();

  usuario.fecha_ingreso = fechaIngreso;
  usuario.password = md5(usuario.password);
 
  // Mongo Model
  usuariosModel.addUsuario(usuario, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"No se ha podido agregar el usuario."});
    }
    return res.status(200).json(resultado);
  });// nuevoUsuario
});


router.delete('/eliminar/:email', function(req, res, next){
  var id = req.params.email;
  usuariosModel.deleteUsuario(id, (err, resultado)=>{
    if(err){
      return res.status(500).json({"error":"No se ha podido eliminar el usuario."});
    }
    return res.status(200).json(resultado);
  }); // deleteUsuario
}); 


router.post('/login', function(req, res, next){
  var crendenciales = req.body;

  var uemail = crendenciales.email;
  var upass = md5(crendenciales.password);

  usuariosModel.getUsuario(uemail, (err, resultado)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"Error al obtener el usuario."});
    }
    else{
      console.log(resultado);
      if(resultado)
      {
        if(upass === resultado.password)
        {
          req.session.logged = true;
          req.session.loggeduser = req.body.email;
          res.status(200).json({"msg":"Ingresado correctamente."});
        }
        else{
          res.status(403).json({"error":"Verifique sus credenciales."});
        }
      }
      else{
        res.status(403).json({"error":"Verifique sus credenciales."});
      }
    }
          
  });//getUsuario

  
});// post login

router.get('/logout', function (req, res, next) {
  var _userData = req.body;
  req.session.logged=false;
  req.session.loggeduser = null;
  res.json({ "msg": "La sesión ha sido cerrada con éxito." });
});// Logout

router.get('/session', function (req, res, next) {
  res.json({ "active": req.session.logged && true});
});// post login

return router;

} // usuariosInit

module.exports = usuariosInit;





///


