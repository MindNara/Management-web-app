const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const upload = require('../multer');


router.get('/Schedule/:userId', async function (req, res, next) {

    const user_id = req.params.userId;
    console.log(user_id)

    try {

        // set today date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ? AND schedule_date = ?",
            [user_id, todayDate]);
        const [scheduleAll, allF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ?",
            [user_id]);

        res.json({
            scheduleToday: scheduleToday,
            scheduleAll: scheduleAll,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})


router.post('/Schedule', async function (req, res, next) {

    const title = req.body;
    const date = req.body;
    console.log(title);
    console.log(date);

    // try {

    //     const schedule = await pool.query('INSERT INTO schedule(schedule_date, schedule_act, user_id) VALUES(?, ?, 1)',
    //         [date, title]);
    //     res.json("success!")

    // } catch (err) {
    //     console.log(err)
    //     return next(err)
    // }

})


exports.router = router;
