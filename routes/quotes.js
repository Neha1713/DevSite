const router = require('express').Router()
const mongoose = require('mongoose')

// Load Quotes Model
require('../models/Quote')
const Quote = mongoose.model('quotes')

router.get('/motivate-me', (req, res) => res.render('index/motivateMe'))
module.exports = router
