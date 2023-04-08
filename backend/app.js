const express = require('express')
const path = require('path')
var cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
app.use(cors())

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Encode body
app.use(bodyParser.urlencoded({ extended: false }));

const task = require('../backend/routes/task')
app.use(task.router)


// const indexRouter = require('./routes/index')
// const blogRouter = require('./routes/blog')
// const commentRouter = require('./routes/comment')

// app.use(indexRouter.router)
// app.use(blogRouter.router)
// app.use(commentRouter.router)

// Config Router
// const homepage = require('../backend/routes/index')
// app.use(homepage.router)

// const dashboard = require('../backend/routes/dashboard')
// app.use(dashboard.router)

// const schedule = require('../backend/routes/schedule')
// app.use(schedule.router)

// const task = require('../backend/routes/task')
// app.use(task.router)

// const notediary = require('../backend/routes/notediary')
// app.use(notediary.router)

// const login = require('../backend/routes/login')
// app.use(login.router)

// const signup = require('../backend/routes/signup')
// app.use(signup.router)

app.listen(3000, () => {
    console.log('Start server at http://localhost:3000')
})

