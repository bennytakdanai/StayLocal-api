const prisma = require("../models/prisma");

 exports.findBookingbyClientId = (clientId)=>{
    return (prisma.booking.findMany({
        where:{clientId},
        include:{tour:true},
        orderBy:
            {tour:{
                date:'asc'
            }
        }
    }))
 }

 exports.findSumNumberOfPeoplebyTourId = (tourId)=>{
    return (prisma.booking.groupBy({
        by:['tourId'],
        _sum:{numberOfPeople:true},
        where:{tourId}
    }))
 }

 exports.findBookingbyTourId = (tourId)=>{
    return(prisma.booking.findMany({
        where:{tourId}
    }))
 }

 exports.createBooking = (data) =>{
    return (prisma.booking.create({data}))
 }

 exports.updateBooking = (numberOfPeople,id)=>{
    return(prisma.booking.update({
        data: {numberOfPeople:numberOfPeople},
        where: {id}
    }))
 }

 exports.deleteBooking =(id)=>{
    console.log(id)
    return (prisma.booking.delete({where:{id}}))
 }