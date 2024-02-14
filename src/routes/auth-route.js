const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const { validateRegister } = require('../middlewares/validator/validate-register')
const { validateLogin } = require('../middlewares/validator/validate-login')


router.post('/register',validateRegister,authController.register)
router.post('/login',validateLogin,authController.login)


module.exports = router