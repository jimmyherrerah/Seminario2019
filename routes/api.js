

var express = require('express');
var router = express.Router();

function initbrodephones(db){

    var brodephonesRoutes = require('./api/brodephones')(db);
    router.use('/brodephones', brodephonesRoutes);
return router;


}

module.exports = initbrodephones;
