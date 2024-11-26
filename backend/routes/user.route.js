const express = require('express')
const User = require('../models/user.model.js')
const router = express.Router()
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/user.controller.js')

router.get('/all', getUsers)
router.get('/:id', getUser)
router.post('/create', createUser)
router.put('/edit/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router