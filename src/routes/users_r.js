const {Router} = require('express');
const router = Router();

const {viewAllUsers,createUser,startSession} = require('../controller/user_c');

router.route('/')
    .get(viewAllUsers);


router.route('/create').post(createUser);
router.route('/login').post(startSession);


module.exports = router;