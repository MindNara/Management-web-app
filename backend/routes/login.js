const express = require("express");
const router = express.Router();

router.get('/Login', function (req, res) {
    res.render('LoginPage')
})

exports.router = router;
