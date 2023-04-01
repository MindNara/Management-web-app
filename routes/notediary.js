const express = require("express");
const router = express.Router();

router.get('/NoteDiary', function (req, res) {
    res.render('NoteDiaryPage')
})

exports.router = router;
