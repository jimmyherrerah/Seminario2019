
var express = require('express');
var router = express.Router(); 

var ObjectID = require('mongodb').ObjectID;



function initbrodephones(db){
    var brodephonesColl = db.collection('brodephones');
router.get('/', (req, res, next)=>{
        brodephonesColl.find().toArray((err, brodephones)=>{

    if(err){
        console.log(err);
        return res.status(404).json({"error":"Error al extraer de la base de datos"});
    }
    return res.status(200).json(brodephones);

    });
 });//get all
  
 router.get('/:id', (req, res, next)=>{
     var id =new ObjectID(req.params.id);
     brodephonesColl.findOne({"_id": id} , (err, doc)=>{
        if(err){
            console.log(err);
            return res.status(404).json({"error":"no se puede obnetener brodephone Intente denuevo"});
        }
        return res.status(200).json(doc);

     });//findOne
 });//id

router.post('/', (req, res, next)=>{
var newBrodephon = Object.assign(
    {},
    {
        "nombre":"",
        "marca":"",
        "modelo":"",
        "descripcion":"",
        "fechaCrated": new Date().getTime(),
        "views":0,
        "likes":0
    },
    req.body
    );
    brodephonesColl.insertOne(newBrodephon, (err, rslt)=>{
        if(err){
            console.log(err);
            return res.status(404).json({"error":"Nose pudo agregar nuevo cellular"});

        }
        if(rslt.ops.length===0){
            console.log(rslt);
            return res.status(404).json({"error":"Nose pudo agregar nuevo cellular"});
        }

        return res.status(200).json(rslt.ops[0]);
    });

});//post

return router;
}

module.exports = initbrodephones; 