const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Evita rehash em atualizações
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User