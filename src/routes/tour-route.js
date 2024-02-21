const express = require('express')
const authenticate = require('../middlewares/validator/authenticate')
const tourController = require('../controllers/tour-controller')
const upload = require('../middlewares/upload')

const router = express.Router()

router.post('/guide',
    authenticate,
    upload.single('tourProfileImage'),
    tourController.createTour)

router.get('/province',tourController.getProvince)
router.get('/homepage',tourController.getHomePageTour)
router.get('/guide',authenticate,tourController.getGuideTour)
router.get('/:tourId',tourController.getTourById)
router.delete('/guide/:tourId',authenticate,tourController.deleteTour)

module.exports = router