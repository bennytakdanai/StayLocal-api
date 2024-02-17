const prisma = require('../models/prisma')


exports.createTour = data => prisma.tour.create({data})

exports.getTourByTourId = id => prisma.tour.findFirst({
    where:{id}
})

exports.getTourByGuideId = guideId => prisma.tour.findMany({
    where:{guideId},
    orderBy:{date:'asc'}
    
})

// exports.updateTourByTourId = (TourId,data)=> prisma.tour.update({
//     where:{id:TourId},
//     data
// })