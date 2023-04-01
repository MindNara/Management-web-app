const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/Task', async function (req, res) {

    const [user, fields] = await pool.query("SELECT * FROM user WHERE user_id = 1");

    res.render('TaskPage', {
        user: user[0]
    })

})

exports.router = router;
