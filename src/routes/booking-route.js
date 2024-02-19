const express = require('express')
const router = express.Router()
const bookingController = require('../controllers/booking-controller')
const authenticate = require('../middlewares/validator/authenticate')



router.get('/',authenticate,bookingController.getClientBooking)
router.post('/',authenticate,bookingController.createBooking)
router.patch('/',authenticate,bookingController.editBooking)
router.delete('/:bookingId',authenticate,bookingController.cancleBooking)






module.exports = router