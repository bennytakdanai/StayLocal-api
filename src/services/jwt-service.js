const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRETKEY 
const EXPIRE_IN = process.env.EXPIRE_IN 

exports.sign = payload => jwt.sign(payload,SECRETKEY,{expiresIn:'10d'})
exports.verify = token => jwt.verify(token,SECRETKEY)

