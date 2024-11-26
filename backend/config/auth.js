const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

require('../models/user.model')
const User = mongoose.model('User')

module.exports = function(passport){
    passport.user(new localStrategy({usernameField: 'email'}, (email, password, done) => {
        User.findOne(({email: email})).then((user) => {
            if(!user){
                return done(null, false, {message: 'conta não existe'})
            }

            bcrypt.compare(password, user.password, (error, match) => {
                if(match){
                    return done(null, user)
                } else{
                    return done(null, false, {message: 'senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        user.findById(id, (error, user) => {
            done(error, user)
        })
    })
}