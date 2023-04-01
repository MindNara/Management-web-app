const express = require("express");
const router = express.Router();

router.get('/Task', function (req, res) {
    res.render('TaskPage')
})

exports.router = router;
