const express = require("express");
const router = express.Router();

router.get('/Schedule', function (req, res) {
    res.render('SchedulePage')
})

exports.router = router;
