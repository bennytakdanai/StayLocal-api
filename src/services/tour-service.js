const prisma = require('../models/prisma')


exports.createTour = data => prisma.tour.create({data})

exports.getTourByTourId = id => prisma.tour.findFirst({
    where:{id},
    include:{
        bookings:true
    }      
})

exports.getTourByGuideId = guideId => prisma.tour.findMany({
    where:{guideId},
    orderBy:{date:'asc'},
    include:{
        bookings:true
    }
})

exports.deleteTourByTourId = tourId => prisma.tour.delete({
    where:{id:tourId}
})


// exports.updateTourByTourId = (TourId,data)=> prisma.tour.update({
//     where:{id:TourId},
//     data
// })