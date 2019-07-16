const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const keys = require('./keys')

require('../models/User')
const User = mongoose.model('users')

module.exports = function(passport) {
  //Local Strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ 'local.email': email }).then(user => {
        if (!user) return done(null, false)
        else {
          bcrypt.compare(password, user.local.password, (err, matched) => {
            if (matched) {
              console.log('User password matched')
              return done(null, user)
            } else {
              console.log('User password did not matched')
              return done(null, false)
            }
          })
        }
      })
    })
  )

  //Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.id,
        clientSecret: keys.google.secret,
        callbackURL: '/auth/google/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        //console.log(JSON.stringify(profile,undefined,2))

        // Profile Photo Display
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf('?')
        )

        User.findOne({ 'google.id': profile.id }).then(user => {
          if (user) {
            done(null, user)
          } else {
            const newUser = {
              google: {
                id: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
              }
            }

            console.log(newUser)
            new User(newUser).save().then(user => {
              if (user) {
                done(null, user)
              } else {
                done(null, false)
              }
            })
          }
        })
      }
    )
  )

  //Github Strategy
  passport.use(
    new GitHubStrategy(
      {
        clientID: keys.github.id,
        clientSecret: keys.github.secret,
        callbackURL: '/auth/github/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(JSON.stringify(profile,undefined,2))
        User.findOne({ 'github.id': profile.id }).then(user => {
          if (user) {
            done(null, user)
          } else {
            const newUser = {
              github: {
                username: profile.username,
                id: profile.id,
                email: profile._json.email
              }
            }

            new User(newUser).save().then(user => {
              if (user) {
                done(null, user)
              } else {
                done(null, false)
              }
            })
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
  })
}
