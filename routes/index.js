const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.render('Homepage')
})

// router.get('/Schedule', function (req, res) {
//     res.render('SchedulePage')
// })

// router.get('/Task', function (req, res) {
//     res.render('TaskPage')
// })

// router.get('/NoteDiary', function (req, res) {
//     res.render('NoteDiaryPage')
// })

// router.get('/Login', function (req, res) {
//     res.render('LoginPage')
// })

// router.get('/Signup', function (req, res) {
//     res.render('SignupPage')
// })

module.exports = router;
