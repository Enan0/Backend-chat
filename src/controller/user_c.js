const userModel = require("../model/users_m");
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
        password
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

module.exports = userController;