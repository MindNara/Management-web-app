const express = require('express')
const path = require('path')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const { logger } = require('./middlewares')
app.use(logger)
app.use(cors())

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Encode body
app.use(bodyParser.urlencoded({ extended: false }));

const homepage = require('../backend/routes/homepage')
const dashboard = require('../backend/routes/dashboard')
const schedule = require('../backend/routes/schedule')
const notediary = require('../backend/routes/notediary')
const task = require('../backend/routes/task')
const login = require('../backend/routes/login')
const signup = require('../backend/routes/signup')

app.use(homepage.router)
app.use(dashboard.router)
app.use(schedule.router)
app.use(notediary.router)
app.use(login.router)
app.use(signup.router)
app.use(task.router)

app.listen(3000, () => {
    console.log('Start server at http://localhost:3000')
})

