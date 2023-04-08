const express = require("express");
const pool = require("../backend/config");
const router = express.Router();

router.get('/NoteDiary', async function (req, res) {

    const [user, fields] = await pool.query("SELECT * FROM user WHERE user_id = 1");

    res.render('NoteDiaryPage', {
        user: user[0]
    })

})

exports.router = router;
