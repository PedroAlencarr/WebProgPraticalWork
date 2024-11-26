const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const User = require('./models/user.model.js')
const userRoute = require('./routes/user.route.js')
const app = express()
const passport = require('passort')
require('./config/auth')(passport)

// middlewares
app.use(express.json())

// environment variables
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT
const project_name = 'Node-API'

//routes
app.use('/user', userRoute)

app.get('/', function (req, res) {
    res.send('Nodemon test')
})

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@backenddb.hldza.mongodb.net/${project_name}?retryWrites=true&w=majority&appName=BackendDB`)
.then(() => {
  console.log('connected to the database')
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
})
.catch(() => {
  console.log('connection failed')
})