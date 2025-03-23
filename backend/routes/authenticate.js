const express = require('express');
const {login, register} = require('../controller/authenticate');
const router = express.Router();

router.route('/register-user').post(register);
router.route('/login-user').post(login);

module.exports = router;