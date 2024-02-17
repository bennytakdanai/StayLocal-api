const jwt = require("../../services/jwt-service");
const catchError = require("../../utils/catch-error");
const createError = require("../../utils/create-error");
const userService = require('../../services/user-service')

const authenticate = catchError(async (req,res,next)=>{
    const authorization = req.headers.authorization
    
    if(!authorization){
        createError('unauthorize',401)
    }
    if(authorization.split(' ')[0] != `Bearer`){
        createError('unauthorize',401)
    }
    const token = authorization.split(' ')[1]
    if(!token){
        createError('unauthorize',401)
    }

    const {id} = jwt.verify(token)

    const user = await userService.findUserbyId(id)
    if(!user){
        createError('no user',401)
    }
    delete user.password
    req.user = user
    console.log(user)
    next()


})

module.exports = authenticate