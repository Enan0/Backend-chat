const {Router} = require('express');
const router = Router();

const {viewAllUsers,createUser,startSession,endSession} = require('../controller/user_c');

router.route('/')
    .get(viewAllUsers);


router.route('/create').post(createUser);
router.route('/login')
    // .put
    .post(startSession);
router.route('/logOut').post(endSession);


module.exports = router;