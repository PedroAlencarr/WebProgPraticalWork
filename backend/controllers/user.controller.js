const User = require('../models/user.model')

const getUsers = async (req, res) => { 
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body)

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        }

        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findByIdAndDelete(id)
      
      if (!user) {
        res.status(404).json({message: 'User not found'})
      }
      
      res.status(200).json({message: `User ${id} deleted`})
  
    } catch (error) {
      res.status(500).json({error: error.message})
    }
}



module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}