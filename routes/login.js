//Login route
const express = require('express');
const router = express.Router();
const loginController = require('../middleware/loginController');


router.post('/',loginController.loginEvent);

module.exports={router};