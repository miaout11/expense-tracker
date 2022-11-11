const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // init Passport model
  app.use(passport.initialize())
  app.use(passport.session())

  // setting Localstrategy login
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // check user exist
        if (!user) {
          return done(null, false, req.flash('warning_msg', '這個Email還沒有註冊過。'))
        }
        // check account data
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('warning_msg', '密碼或Email錯誤。'))
          } return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  // setting serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })

}