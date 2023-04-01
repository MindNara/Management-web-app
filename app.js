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
const homepage = require('./routes/Index')
app.use('/', homepage)

const dashboard = require('./routes/Index')
app.use('/Dashboard', dashboard)

const schedule = require('./routes/Index')
app.use('/Schedule', schedule)

const task = require('./routes/Index')
app.use('/Task', task)

const notediary = require('./routes/Index')
app.use('/NoteDiary', notediary)

const login = require('./routes/Index')
app.use('/Login', login)

const signup = require('./routes/Index')
app.use('/Signup', signup)

app.listen(3000, () => {
    console.log('Start server at http://localhost:3000')
})

