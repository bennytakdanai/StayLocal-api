const Joi = require('joi')

const registerSchema = Joi.object({
    
    username: Joi.string().required().trim().messages({
        'string.emty':'username is required',
        'any.required':'username is required'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}/).required().messages({
        'string.emty':'password is required',
        'string.pattern.base':'password must be alphabets and at least 6 characters long',
        'any.required':'password is required'
    })

})

exports.validateLogin = (req,res,next)=>{
    const {value,error} = registerSchema.validate(req.body)
    if(error){
        throw error
    }
    req.body = value
    next()
    
} 