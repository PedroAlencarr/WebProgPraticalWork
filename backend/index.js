const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.get('/', function (req, res) {
    res.send('Nodemon test')
  })
  
app.listen(3000)

console.log('Server is running on port http://localhost:3000')

mongoose.connect('mongodb+srv://admin:<db_password>@backenddb.hldza.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')