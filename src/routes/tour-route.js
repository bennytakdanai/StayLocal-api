const express = require('express')
const authenticate = require('../middlewares/validator/authenticate')
const tourController = require('../controllers/tour-controller')

const router = express.Router()


router.post('/',authenticate,tourController.createTour)
router.get('/',authenticate,tourController.getGuideTour)

module.exports = router