const prisma = require('../models/prisma')


exports.createTour = data => prisma.tour.create({data})

exports.getTourByGuideId = guideId => prisma.tour.findMany({
    where:{guideId}
})

// exports.updateTourByTourId = (TourId,data)=> prisma.tour.update({
//     where:{id:TourId},
//     data
// })