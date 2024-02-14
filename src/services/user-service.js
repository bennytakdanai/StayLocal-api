const prisma = require("../models/prisma");

exports.findUserbyUsernameOrEmail = (username,email)=>{
    return (prisma.user.findFirst({
        where:{ 
            OR:[{username},{email}]
        }
    })
    )
}
exports.createUser = data => prisma.user.create({data})