const {Router} = require('express');
const router = Router();

const {enviarMensaje,verMensajes} = require('../controller/mensajes_c');

router.route('/chat/:receptor')
    .post(enviarMensaje)
    .get(verMensajes)

module.exports =router;