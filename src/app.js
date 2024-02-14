require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/not-found')
const error = require('./middlewares/error')
const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())
app.use(express.json())



app.use(notFound)
app.use(error)


app.listen(PORT,()=> {console.log(`server is running on port ${PORT}`)})