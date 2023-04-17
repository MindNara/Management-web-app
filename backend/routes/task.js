const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get("/Task", async function (req, res, next) {
    try {

        const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1");
        const [task, fields] = await pool.query("SELECT list_id, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date, list_act, list_status, user_id FROM to_do_list JOIN user USING(user_id) WHERE user.user_id = 1");

        res.json({
            task: task,
            user: user[0],
        })

    }
    catch (err) {
        return next(err)
    }
});

exports.router = router;
