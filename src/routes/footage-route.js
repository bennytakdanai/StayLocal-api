const express = require('express')
const router = express.Router()
const footageController = require('../controllers/footage-controller')
const authenticate = require('../middlewares/validator/authenticate')
const upload = require('../middlewares/upload')


router.post('/',
    authenticate,
    upload.array('footageLink'),
    footageController.createFootage)






module.exports = router