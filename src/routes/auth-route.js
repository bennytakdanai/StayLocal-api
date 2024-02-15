const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const { validateRegister } = require('../middlewares/validator/validate-register')
const { validateLogin } = require('../middlewares/validator/validate-login')
const authenticate = require('../middlewares/validator/authenticate')


router.post('/register',validateRegister,authController.register)
router.post('/login',validateLogin,authController.login)
router.get('/me',authenticate,authController.getMe)


module.exports = router