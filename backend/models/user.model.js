const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },

        first_name: {
            type: String,
            required: true,
        },

        last_name: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true
        },

        created_at: {
            type: Date,
            default: Date.now,
            required: true
        },

        deleted_at: {
            type: Date,
            default: null
        }
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User