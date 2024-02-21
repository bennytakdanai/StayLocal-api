const userService = require('../services/user-service')
const bcrypt = require('bcryptjs')
const createError = require('../utils/create-error')
const catchError = require('../utils/catch-error')
const jwtService = require('../services/jwt-service')

exports.register = catchError( async(req,res,next) =>{
    const existUsernameOrEmail = await userService.findUserbyUsernameOrEmail(req.body.username,req.body.email)
    if(existUsernameOrEmail){
        createError("username or email in use",400)
    }
        
    req.body.password = await bcrypt.hash(req.body.password,12)
    delete req.body.confirmPassword
    newUser = await userService.createUser(req.body)

    console.log(newUser)

    const payload = {id:newUser.id}
    delete newUser.password
    const token = jwtService.sign(payload)
        
    res.status(201).json({token,newUser})
    })

exports.login = catchError( async(req,res,next)=>{
    console.log(req.body)
    const loginUser = await userService.findUserbyUsernameOrEmail(req.body.username)
    if(!loginUser){
        createError("username invalid",400)
    }
    
    if( bcrypt.compare(req.body.password,loginUser.password)){
        const token = jwtService.sign({id:loginUser.id})
        delete loginUser.password
        res.status(200).json({token,loginUser})
    }
})

exports.getMe = catchError(async(req,res,next)=>{
    res.json({user : req.user})
})