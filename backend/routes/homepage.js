const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/', function (req, res) {
    try {
        // return res.render('Homepage')
    } catch (err) {
        return next(err)
    }
})

exports.router = router;
