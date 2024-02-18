const prisma = require("../models/prisma");

exports.findUserbyUsernameOrEmail = (username,email)=>{
    return (prisma.user.findFirst({
        where:{ 
            OR:[{username},{email}]
        }
    })
    )
}
exports.findUserbyId = (id)=>{
    return (prisma.user.findUnique({
        where: {id}
    }))
}

exports.createUser = data => prisma.user.create({data})

exports.updateUserProfile = (data,id) => {
    return( prisma.user.update({
        data,
        where:{id}
    }))
}