const {Router} = require('express');
const router = Router();

const {viewAllUsers,createUser,startSession,endSession,verifiqueSession} = require('../controller/user_c');

//DEV TOOL
router.route('/')
    .get(viewAllUsers);

//Crear usuario
router.route('/singup').post(createUser);
//Iniciar sesion
router.route('/login').post(startSession);
//Cerrar sesion
router.route('/logOut').post(endSession);

router.route('/verifique').get(verifiqueSession)

module.exports = router;