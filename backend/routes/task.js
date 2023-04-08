const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get("/Task", async function (req, res, next) {
    try {
        const [task, fields] = await pool.query("SELECT * FROM to_do_list JOIN user USING(user_id) WHERE user.user_id = 1");

        res.json({
            task: task,
        })

    }
    catch (err) {
        return next(err)
    }
});

exports.router = router;
