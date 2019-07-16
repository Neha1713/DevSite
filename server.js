const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const bodyParser = require('body-parser')

require('./config/passport')(passport)

const keys = require('./config/keys')
const index = require('./routes/index')
const auth = require('./routes/auth')
const profile = require('./routes/profile')
const tips = require('./routes/tips')
const quotes = require('./routes/quotes')

const app = express()

//View Engine Setup
app.use(express.static(path.join(__dirname, '/public/')))
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: require('./helper/conditionalHelpers.js').helpers
  })
)
app.set('view engine', 'handlebars')

//BodyParser
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//DB Config
const { mongoURI } = keys
//Connect to Mongo
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Database!')
  })
  .catch(e => {
    console.log(e)
  })

//Creating Session
app.use(cookieParser())
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Set Global User Variable
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

//Routes
app.use('/', index)
app.use('/auth', auth)
app.use('/', profile)
app.use('/', tips)
app.use('/', quotes)

//Port Setup
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`)
})
