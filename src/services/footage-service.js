const prisma = require('../models/prisma')


exports.createFootage = data => prisma.footage.create({data})

exports.getFootageByTourId = tourId => prisma.footage.findMany({
    where:{tourId}
})