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
            console.log(req.session.userId);
            res.json({succes:"SESSION START"});
        }else{
            res.json({succes:"SESSION DONT START"});
        }
    }   
}


userController.endSession = async(req,res)=>{
    //Termina la sesion
    await req.session.destroy();
}

userController.enviarMensaje = async(req,res)=>{
    if(req.session.logged){
        //1 Crear mensaje
        var {texto} = req.body;
        const emisor = await userModel.findById(req.session.userId);
        const receptor = await userModel.findById(req.params.receptor);
        const mensaje = new mensajeModel({
            emisor:emisor.email,
            receptor:receptor.email,
            mensaje:texto
        });
        //2 Lo guarda en la base de datos
        await mensaje.save();
        res.json({status:"Mensaje enviado"});
    }
}

userController.verMensajes = async(req,res)=>{
    //Muestra los mensajes
    if(req.session.logged){
        //1 Obtiene el receptor y emisor
        const emisor = await userModel.findById(req.session.userId);
        const receptor = await userModel.findById(req.params.receptor);
        //2 Busca mensajes
        const mensajes = await mensajeModel.find({emisor:emisor.email,receptor:receptor.email});
        //3 Los muestra en pantalla
        res.json(mensajes);
    }
}
module.exports = userController;