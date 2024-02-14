const Joi = require('joi')

const registerSchema = Joi.object({
    
    username: Joi.string().required().trim().messages({
        'string.emty':'username is required',
        'any.required':'username is required'
    }),
    firstname: Joi.string().required().trim().messages({
        'string.emty':'firstname is required',
        'any.required':'firstname is required'
    }),
    lastname: Joi.string().required().trim().messages({
        'string.emty':'lastname is required',
        'any.required':'lastname is required'
    }),
    email: Joi.string().required().trim().email({tlds:false}).messages({
        'string.emty':'email is required',
        'any.required':'email is required'
    }),
    isGuide: Joi.boolean().required().messages({
        'any.required':'please select guide or client'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}/).required().messages({
        'string.emty':'password is required',
        'string.pattern.base':'password must be alphabets and at least 6 characters long',
        'any.required':'password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.emty':'password is required',
        'any.only':'confirm password must be the same as password',
        'any.required':'password is required'
    })
})

exports.validateRegister = (req,res,next)=>{
    const {value,error} = registerSchema.validate(req.body)
    if(error){
        throw error
    }
    req.body = value
    next()
    
} 