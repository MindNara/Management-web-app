const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const upload = require('../multer');


router.get('/Schedule', async function (req, res, next) {

    try {

        const user = await pool.query('SELECT * FROM user WHERE user_id = 1');

        // set today date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const scheduleToday = await pool.query("SELECT * FROM schedule WHERE user_id = 1 AND schedule_date = ?", [todayDate]);

        const scheduleAll = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = 1");

        Promise.all([user, scheduleToday, scheduleAll])
            .then((results) => {
                const user = results[0];
                const scheduleToday = results[1];
                const scheduleAll = results[2];
                res.render('SchedulePage', {
                    user: user[0][0],
                    scheduleToday: scheduleToday[0],
                    scheduleAll: scheduleAll[0],
                });
                // console.log(user[0][0])
                // console.log(schedule[0])
                // console.log(scheduleAll[0])
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
