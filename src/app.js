require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const error = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const tourRoute = require('./routes/tour-route')
const bookingRoute = require('./routes/booking-route')
const footageRoute = require('./routes/footage-route')
const userRoute = require('./routes/user-route')
const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())
app.use(express.json())
app.use('/public',express.static('public'))

app.use('/auth',authRoute)
app.use('/footage',footageRoute)
app.use('/tour',tourRoute)
app.use('/booking',bookingRoute)
app.use('/user',userRoute)



app.use(notFound)
app.use(error)


app.listen(PORT,()=> {console.log(`server is running on port ${PORT}`)})