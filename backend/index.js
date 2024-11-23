const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const User = require('./models/user.model.js')
const app = express()

app.use(express.json())

const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const PORT = process.env.PORT
const project_name = 'Node-API'


app.get('/', function (req, res) {
    res.send('Nodemon test')
})

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})  

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.get('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.put('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, req.body)
    
    if (!user) {
      res.status(404).json({message: 'User not found'})
    }

    const updatedUser = await User.findById(id)   
    res.status(200).json(updatedUser)

  } catch (error) {
    res.status(500).json({error: error.message})
  }
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