const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TipsSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// create collection and add Schema
module.exports = Tips = mongoose.model('tips', TipsSchema)
