var express = require("express");
var router = express.Router();
router.use('/lostpassword', require('./forgottenpw'));
router.use('/logout', require('./logout'));
router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/main', require('./main'));
module.exports = router;
