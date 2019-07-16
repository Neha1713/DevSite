const router = require('express').Router()
const mongoose = require('mongoose')

// Load User Model
require('../models/Tips')
// const Tips = mongoose.model('tips')

const tips = {
  title: 't1',
  body: 'b1'
}

router.get('/dalily-js-tips', (req, res) => {
  Tips.find({}).then(tips => {
    res.render('index/dailyJS')
  })
})

module.exports = router
