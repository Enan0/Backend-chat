const userModel = require("../model/users_m");
const mensajeModel = require('../model/mensajes_m');
const userController = {};
const bcrypt = require("bcrypt");
const saltRounds = 13;
const salt = bcrypt.genSaltSync(saltRounds);

userController.viewAllUsers = async(req,res)=>{
    /*muestra todos los usuarios*/
    const users = await userModel.find();
    res.send(users);
}

userController.createUser = async(req,res)=>{
    /* Crea un usuario*/

    //Pedimos los datos
    var {email,username,password} = req.body;
    password = bcrypt.hashSync(password,salt);

    const user = new userModel({
        email,
        username,
        password,
        salt: "test"
    });
    
    await user.save()
    .then(()=>{
        res.json({succes:"User created"});
    })
    .catch((err)=>{
        console.log(`Error al crear usuario ${err.message}`);
        res.json({status:"error"});
    })

}

userController.startSession = async(req,res)=>{
    /*Crea la session*/
    var {email,username,password} = req.body;
    const user = await userModel.findOne({email});
    const matchPassword = await bcrypt.compareSync(password,user.password);

    if(user){
        if(matchPassword){
            req.session.logged = true,
            req.session.userId = user._id
            res.cookie("userId",user._id);
            res.json({status:"Session start"});
        }else{
            res.json({succes:"SESSION DONT START"});
        }
    }   
}


userController.endSession = async(req,res)=>{
    //Termina la sesion
    await req.session.destroy();
}

userController.verifiqueSession = async(req,res)=>{
    res.send(req.cookies)
}

module.exports = userController;