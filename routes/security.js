const express = require('express');
var router = express.Router();

function initSecurity(db){
var userModel = require('./users')(db);


router.put('/login',(req, res, next)=>{
 userModel.obtenerPorCorreo(req.body.email, (err, user)=>{
   if(err){
      return res.status(404).json(err);
   }
   return res.status(200).json(user);

 });

})

return router;
}
module.exports = initSecurity;