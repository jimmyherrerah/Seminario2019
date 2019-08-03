var express = require('express');
var router = express.Router();

function apiInit(db){
  var usuariosApi = require('./api/usuarios')(db);
  var productosApi = require('./api/productos')(db);
  var clientesApi = require('./api/clientes')(db);
  var carritoApi = require('./api/carrito')(db);
  

  function verificarLogin(req, res, next ){
    var isLoggedIn = req.session.logged && true;
    if(isLoggedIn){
      next();
    }else{
      res.status(403).json({"error":"Ingrese sus credenciales para acceder."});
    }
  }
  

  router.use('/usuarios', usuariosApi);
  router.use('/productos', verificarLogin, productosApi);
  router.use('/clientes', verificarLogin, clientesApi);
  router.use('/carrito', verificarLogin, carritoApi);
  
  return router;
}
module.exports = apiInit;
