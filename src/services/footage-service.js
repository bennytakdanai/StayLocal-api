const prisma = require('../models/prisma')


exports.createFootage = data => prisma.footage.create({data})