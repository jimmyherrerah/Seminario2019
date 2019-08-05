var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');

//la funcion que me devolvera db 

module.exports =function(db){
    var userColl =db.collection('users');
    var userModel = {}

    //obtendra el usuario por correo electronico
    userModel.obtenerPorcorre =function(email, handler){
        var query ={"email": email};
        userColl.findOne(query, (err, user)=>{
            if(err){
                console.log(err);
                handler(err, null);
            }

            //si  no existe documento
            if(!doc){
                return handler(new Error("no se encontro usuario"),null);
            
            }
            return handler(null,user);
        });
    }

    //ingresa un nuevo usuario ala nueva coleccion
   userModel.agregarNuevo =(email, password, handler)=>{
     var newUser = Object.assign({}, {
         email:email,
         password: genPassword(password),
         dateCreated: new Date().getTime(),
         active: true,
         lastPasswords:[],
         roles:["public"]
        }
         );


     userColl.insertOne(newUser, (err, result)=>{
        if(err){
            console.log(err);
            return handler(err, null);
        }
        if(result.insertedCount == 0){
            return handler(new Error("No se guardo el usuario"),null);
        } 
        return handler(null, result.ops[0]);
     });
   }//agrega nuevo

userModel.changePassword = (email, newPassword, handler)=>{
var query ={email: email};
var projection = {"password":1, "active":1, "lastPasswords":1};
userColl.findOne(query, {"projection": projection}, (err,user)=>{
if(err){
    console.log(err);
    return handler(err, null);

}
if(!user){
    return handler(new Error("no se encontro usuario"),null);
}
if(!user.active){
    return handler(new Error("usuario inactivo"),null);
}
var newPasswordHash = genPassword(newPassword);
if(bcrypt.compareSync(newPassword, user.password)){
    return handler(new Error("debe usar una contrasena no utilizada anteriormente"),null);
}


//aremos un filtro
var oldPasswords = user.lastPasswords.filter(
(psw, i)=>{
    return bcrypt.compareSync(newPassword, psw);
}

    );

    if(oldPasswords.length >0){
        return handler(new Error("debe usar una contrasena no utilizada anteriormente"),null);
    }
        //que saque de indicxe 1 al 4
 var lastPasswords = user.lastPasswords.slice(1,4);
 lastPasswords.push(user.password);

    var update = {
        "$set": {"password": newPasswordHash, "lastPassword": lastPasswords, "lastChagedPaaword": new Date().getTime()}
    }
    userColl.updateOne({_id: user._id}, update, (err, result)=>{
if(err){
    console.log(err);
    return handler(err, null);
}
return handler(null, true);
    });

});
}//changepassword

function genPassword(rawpassword){
    var hashedPassword = bcrypt.hashSync(rawpassword, 10) ;
    
    return hashedPassword;
}


    return userModel;
}