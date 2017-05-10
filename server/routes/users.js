var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController')
const passport = require('passport');

router.get('/', controller.findUsers);
router.post('/register', controller.addUser);
router.post('/', passport.authenticate('local', { session: false }), controller.createToken);
router.post('/:fb', controller.findOrCreateUserFb);

module.exports = router;
