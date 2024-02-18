const express = require('express')
const authenticate = require('../middlewares/validator/authenticate')
const router = express.Router()
const upload = require('../middlewares/upload')
const userController = require('../controllers/user-controller')

router.patch('/',
    authenticate,
    upload.single('profilePicture'),
    userController.updateUserProfile
    )

module.exports = router 