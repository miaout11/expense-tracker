const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // init Passport model
  app.use(passport.initialize())
  app.use(passport.session())

  // setting Localstrategy login
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // check user exist
        if (!user) {
          return done(null, false, { message: '這個電子信箱還未註冊過!' })
        }
        // check account data
        if (user.password !== password) {
          return done(null, false, { message: '電子信箱或密碼錯誤!' })
        }
        return done(null, user)
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