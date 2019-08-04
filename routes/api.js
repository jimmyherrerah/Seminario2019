var express = require('express');
var router = express.Router();

function initApi(db){
var brodephoneRoutes = require('./api/brodephone')(db);
router.use('/brodephone',brodephoneRoutes);
return router;

}

module.exports =initApi;