const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  fullname: {
    type: String
  },
  mobile: {
    type: String
  },
  location: {
    type: String
  },
  languages: {
    type: String
  },

  social: {
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    github: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },

  status: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
})

// create collection and add Schema
module.exports = Profile = mongoose.model('profile', ProfileSchema)
