const express = require("express");
const router = express.Router();

router.get('/Dashboard', function (req, res) {
    console.log("Hello")
    res.render('Dashboard')
})

module.exports = router;
