const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT
const project_name = 'Node-API'


app.get('/', function (req, res) {
    res.send('Nodemon test')
  })
  
app.listen(PORT)

console.log(`Server is running on port http://localhost:${PORT}`)

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@backenddb.hldza.mongodb.net/${project_name}?retryWrites=true&w=majority&appName=BackendDB`)
.then(() => {
  console.log('connected to the database')
})
.catch(() => {
  console.log('connection failed')
})