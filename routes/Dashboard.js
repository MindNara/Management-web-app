const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/Dashboard', async function (req, res) {
    console.log("Hello")

    const [rows, fields] = await pool.query("SELECT * FROM user WHERE user_id = 1");
    console.log(rows)

    res.render('Dashboard', {
        user: rows[0]
    })
})

exports.router = router;
