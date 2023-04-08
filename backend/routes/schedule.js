const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const upload = require('../multer');


router.get('/Schedule', async function (req, res, next) {

    try {

        // set today date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT * FROM schedule WHERE user_id = 1 AND schedule_date = ?", [todayDate]);
        const [scheduleAll, allF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = 1");
        const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1");

        res.json({
            user: user[0],
            scheduleToday: scheduleToday[0],
            scheduleAll: scheduleAll[0],
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})


router.post('/Schedule', async function (req, res, next) {

    const title = req.body.schedule_act;
    const date = req.body.schedule_date;
    // console.log(title);
    // console.log(date);

    try {

        const schedule = await pool.query('INSERT INTO schedule(schedule_date, schedule_act, user_id) VALUES(?, ?, 1)',
            [date, title]);
        res.redirect('/Schedule');

    } catch (err) {
        console.log(err)
        return next(err)
    }

})


exports.router = router;
