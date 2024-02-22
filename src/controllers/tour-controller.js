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
    const urlPicture = await uploadService.upload(req.file.path)

    req.body.guideId = user.id
    req.body.groupSize = +req.body.groupSize
    req.body.price = +req.body.price
    req.body.date = new Date(req.body.date)
    req.body.tourProfileImage = urlPicture
    console.log(req.body)
    const tour = await tourService.createTour(req.body)
    fs.unlink(req.file.path)
    res.status(200).json({tour})
    
})

exports.getTourById = catchError(async(req,res,next)=>{
    const {tourId : id} = req.params 
    console.log(req.params)
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

exports.getProvince = catchError(async(req,res,next)=>{
    const locations = await tourService.getAllTourProvince()
    const provinces = locations.reduce((acc,el)=>{
        let province = (el.location).split(', ')[1]
        if(acc.findIndex((p)=>p == province) ==-1){
             acc.push(province)
        }
        return acc
    } ,[])

    res.status(200).json({provinces})
})

exports.getHomePageTour = catchError(async(req,res,next)=>{
    console.log(req.body)
    const province = req.body.location||undefined
    const date = req.body.date? new Date(req.body.date) : undefined
    
    const type = req.body.type||undefined
    let pricemax
    let pricemin
    if(req.body.price =='0-1500'){
        pricemin=0
        pricemax=1501
    }else if(req.body.price =='1500-3000'){
        pricemin = 1501
        pricemax = 3001
    }else if(req.body.price =='3000-5000'){
        pricemin = 3001
        pricemax = 5001
    }else if(req.body.price =='more than 5000'){
        pricemin = 5001
        pricemax = 100000
        
    }
    const homePageTour = await tourService.getSearchedTour(province,date,pricemax,pricemin,type)
    res.status(200).json({homePageTour})
})