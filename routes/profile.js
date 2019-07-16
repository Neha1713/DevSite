const express = require('express')
const router = express.Router()
const { Authenticated } = require('../helper/auth')
const mongoose = require('mongoose')
const passport = require('passport')

// Load Profile Model
require('../models/Profile')
const Profile = mongoose.model('profile')

// Load User Model
require('../models/User')
const User = mongoose.model('users')

module.exports = router
