const express = require('express')
const authenticate = require('../middlewares/validator/authenticate')
const tourController = require('../controllers/tour-controller')

const router = express.Router()

router.get('/:tourId',tourController.getTourById)
router.post('/guide',authenticate,tourController.createTour)
router.get('/guide',authenticate,tourController.getGuideTour)

module.exports = router