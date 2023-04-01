const express = require("express");
const router = express.Router();

router.get('/Signup', function (req, res) {
    res.render('SignupPage')
})

exports.router = router;
