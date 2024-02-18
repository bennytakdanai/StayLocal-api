const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service")
const uploadService = require('../services/upload-service')
const fs = require('fs/promises')

exports.updateUserProfile = catchError(async(req,res,next)=>{
    console.log(req.file)
    if(!req.file){
        createError('profile picture is required',400)
    }
    const urlPicture  = await uploadService.upload(req.file.path)
    fs.unlink(req.file.path)
    
    await userService.updateUserProfile({ profilePicture:urlPicture},req.user.id)

    res.status(200).json({message:"success"})
})