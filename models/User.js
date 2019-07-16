const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  local: {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },

  google: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    id: {
      type: String
    },
    image: {
      type: String
    }
  },

  github: {
    id: {
      type: String
    },
    email: {
      type: String
    },
    username: {
      type: String
    }
  },

  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', UserSchema)

module.exports = User
