const {Router} = require('express');
const router = Router();

const {enviarMensaje,verMensajes} = require('../controller/mensajes_c');

/*El receptor es pasado por el path */
router.route('/chat/:receptor')
    //Envia un mensaje al receptor
    .post(enviarMensaje)
    //Muestra los mensajes del emisor y el receptor
    .get(verMensajes)

module.exports =router;