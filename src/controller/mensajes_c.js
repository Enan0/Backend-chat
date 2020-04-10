const mensajeModel = require("../model/mensajes_m");
const userModel = require('../model/users_m');
const mensajeController = {};


mensajeController.enviarMensaje = async (req,res)=>{
    /*Envia un mensaje al receptor*/
    if(req.session.logged){
        //1 Definir emisor y receptor 
            //Guardo los id en varaibles
            const idEmisor = req.session.userId;
            const idReceptor = req.params.receptor;
        //Obtengo el email del emisor y receptor    
        const emisor = await userModel.findById(idEmisor);
        const receptor = await userModel.findById(idReceptor);
        //2 Crear mensaje
        const {texto} = req.body;
        const mensaje = new mensajeModel({
            emisor:emisor.email,
            receptor:receptor.email,
            mensaje:texto
        });
        //3 Subir mensaje
        await mensaje.save()
        .then(res.json({status:"Mensaje enviado"}))
        // .catch(res.json({status:"Error al enviar mensaje"}));
    }else{
        res.json({status:"Necesitas estar logeado"});
    }
}

mensajeController.verMensajes = async(req,res)=>{
    /*Muestra todos los mensajes correspondientes al emisor y receptor */
    if(req.session.logged){
        //1 Definir emisor y receptor 
            //Guardo los id en varaibles
            const idEmisor = req.session.userId;
            const idReceptor = req.params.receptor;
        //Obtengo el email del emisor y receptor    
        const emisor = await userModel.findById(idEmisor);
        const receptor = await userModel.findById(idReceptor);
        //2 Buscamos los mensajes y los guardamos
        const mensajesEnviados = await mensajeModel.find({emisor:emisor.email,receptor:receptor.email});
        const mensajesRecibidos = await mensajeModel.find({receptor:emisor.email,emisor:receptor.email});
        //3Mostramos los mensajes
        const mensajes = mensajesEnviados.concat(mensajesRecibidos);
        res.send(mensajes);
    }else{
        res.json({status:"Necesitas estar logeado"});
    }
}


module.exports = mensajeController;

