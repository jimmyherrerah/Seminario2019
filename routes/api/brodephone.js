var express = require('express');
var router = express.Router();

function initbrodephone(db){
var brodephoneColl =db.collection('brodephone');
router.get('/',(req, res, next)=>{
res.status(200).json({"api":"1"});


});
    return router;

}

module.exports =initbrodephone;