const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get("/Task", async function (req, res, next) {
    try {
        const [task, fields] = await pool.query("SELECT * FROM to_do_list WHERE user_id = 1");
        const [user, fields2] = await pool.query("SELECT * FROM user WHERE user_id = 1");

        res.json({
            task: task,
            user: user[0]
        })
    } 
    catch (err) {
        return next(err)
    }
});

exports.router = router;
