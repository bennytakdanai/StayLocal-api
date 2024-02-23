const { date } = require('joi')
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

exports.getAllTourProvince = () => prisma.tour.findMany({
    select:{
        location:true
    }
})

exports.getSearchedTour = (province,date,pricemax,pricemin,type) => prisma.tour.findMany({
    where:{
        AND:[
            {location:{endsWith:province}},
            {date:date||undefined},
            {AND:[
                {price:{gt:pricemin}},
                {price:{lt:pricemax}}
            ]},
            {type:type}
        ]
    },
    orderBy:{date:'asc'}
})

exports.updateTourByTourId = (tourId,data)=> prisma.tour.update({
    where:{id:tourId},
    data
})