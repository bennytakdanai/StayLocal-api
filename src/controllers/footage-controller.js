const footageService = require('../services/footage-service')
const uploadService = require("../services/upload-service");
const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const fs = require('fs/promises')



exports.createFootage = catchError(async(req,res,next)=>{
    const user = req.user
    if(!user.isGuide){
        createError("only guide can add footage",401)
    }

    try{
        const createdFootageLink = []
        for(const el of req.files){
            const isVideo = (el.mimetype === 'video/mp4')
            const tourId = 1

            let urlFootage 
            if(isVideo){
                urlFootage = await uploadService.uploadVideo(el.path)
            }else{
                urlFootage = await uploadService.upload(el.path)
            }

            const footageData = {
                isVideo,tourId,footageLink:urlFootage
            }
            const footage = await footageService.createFootage(footageData)
            createdFootageLink.push(footage)
            fs.unlink(el.path)
        }
        res.status(200).json({footageLink: createdFootageLink})
    }catch(err){
        console.log(err)
    }


    
})
// req.files.forEach(async (el) => {
//     if(el.mimetype == 'video/mp4'){
//         req.body.isVideo = true
//     }else{
//         req.body.isVideo = false
//     }
//     req.body.tourId = 1
//     let urlFootage
//     try{
//         if(req.body.isVideo){
//             urlFootage = await uploadService.uploadVideo(el.path)
//         }else{
//             urlFootage = await uploadService.upload(el.path)
//         }
//         console.log(urlFootage)
//         req.body.footageLink = urlFootage
//         const footage = await footageService.createFootage(req.body)
//         fs.unlink(el.path)
//         res.status(200).json({footage})

//     }catch(err){
//         console.log(err)
//     }
// });

