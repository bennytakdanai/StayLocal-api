require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const error = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const tourRoute = require('./routes/tour-route')
const bookingRoute = require('./routes/booking-route')
const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())
app.use(express.json())

app.use('/auth',authRoute)
app.use('/tour',tourRoute)
app.use('/booking',bookingRoute)

app.use(notFound)
app.use(error)


app.listen(PORT,()=> {console.log(`server is running on port ${PORT}`)})