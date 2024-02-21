const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const tourService = require("../services/tour-service");
const bookingService = require("../services/booking-service");
const uploadService = require("../services/upload-service");
const { json } = require("express");
const fs = require('fs/promises')

exports.createTour = catchError (async(req,res,next)=>{
    const user = req.user
    // console.log(user)
    if (!user.isGuide){
        createError("only guide can create tour",401)
    }
    console.log(req.body.date)
    const urlPicture = await uploadService.upload(req.file.path)

    req.body.guideId = user.id
    req.body.groupSize = +req.body.groupSize
    req.body.price = +req.body.price
    req.body.date = new Date(req.body.date)
    req.body.tourProfileImage = urlPicture
    const tour = await tourService.createTour(req.body)
    fs.unlink(req.file.path)
    res.status(200).json({tour})
    // res.status(200).json({mes:'success'})

    
})

exports.getTourById = catchError(async(req,res,next)=>{
    const {tourId : id} = req.params 
 
    const tour = await tourService.getTourByTourId(+id)
    const sumPeople = await bookingService.findSumNumberOfPeoplebyTourId(+id)
    res.status(200).json({tour,sumPeople})
})

exports.getGuideTour = catchError(async(req,res,next)=>{
    const user = req.user
    
    if (!user.isGuide){
        createError("only guide can get tour",401)
    }
    
    const tours = await tourService.getTourByGuideId(user.id)
    res.status(200).json({tours})
})

exports.deleteTour = catchError(async(req,res,next)=>{
    const user = req.user
    if (!user.isGuide){
        createError("only guide can delete tour",401)
    }

    const deletedTour = await tourService.deleteTourByTourId(+req.params.tourId)
    res.status(200).json({deletedTour})
})