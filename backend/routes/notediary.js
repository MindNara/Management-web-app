const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/NoteDiary', async function (req, res) {

    try {

        const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1");

        res.json({
            user: user[0],
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})

exports.router = router;
