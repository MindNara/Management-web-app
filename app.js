const express = require('express')
const path = require('path')
// const article = require('./management_db')

const app = express()

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Config Router
const homepage = require('./routes/index')
app.use(homepage.router)

const dashboard = require('./routes/dashboard')
app.use(dashboard.router)

const schedule = require('./routes/schedule')
app.use(schedule.router)

const task = require('./routes/task')
app.use(task.router)

const notediary = require('./routes/notediary')
app.use(notediary.router)

const login = require('./routes/login')
app.use(login.router)

const signup = require('./routes/signup')
app.use(signup.router)

app.listen(3000, () => {
    console.log('Start server at http://localhost:3000')
})

