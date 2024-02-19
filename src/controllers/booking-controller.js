const catchError = require("../utils/catch-error");
const bookingService = require("../services/booking-service");
const createError = require("../utils/create-error");

exports.getClientBooking = catchError(async(req,res,next)=>{
    if(req.user.isGuide){
        createError("only client can get booking",401)
    }
    const clientId = req.user.id
    
    const clientBooking =  await bookingService.findBookingbyClientId(clientId)
    res.status(200).json({clientBooking})
})

exports.createBooking = catchError(async(req,res,next)=>{
    if(req.user.isGuide){
        createError("only client can book the tour",401)
    }
    const clientId = req.user.id
    req.body.clientId = clientId
    const bookingCreated = await bookingService.createBooking(req.body)
    // res.status(200).json({msg:'success'})
    res.status(200).json({bookingCreated})
})

exports.editBooking = catchError(async(req,res,next)=>{
    if(req.user.isGuide){
        createError("only client can edit booking",401)
    }
    console.log(req.body)
    const bookingEdited = await bookingService.updateBooking(req.body.numberOfPeople,req.body.id)
    res.status(200).json({bookingEdited})
})

exports.cancleBooking = catchError(async(req,res,next)=>{
    if(req.user.isGuide){
        createError("only client can cancel booking",401)
    }
    console.log(req.params)
    const bookingCancel = await bookingService.deleteBooking(+req.params.bookingId)
    res.status(200).json({bookingCancel})
})