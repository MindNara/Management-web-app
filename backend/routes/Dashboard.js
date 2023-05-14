const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const upload = require('../multer');


router.get('/Dashboard/:userId', async function (req, res, next) {

    const user_id = req.params.userId;

    try {

        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ? AND schedule_date = ?",
            [user_id, todayDate]);

        const [task, fields] = await pool.query("SELECT list_id, DATE_FORMAT(list_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date, list_act, list_status, user_id FROM to_do_list JOIN user USING(user_id) WHERE user.user_id = ?",
            [user_id]);

        const [note, noteF] = await pool.query("SELECT * FROM note_diary WHERE user_id = ?",
            [user_id]);

        res.json({
            scheduleToday: scheduleToday,
            task: task,
            note: note,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})

exports.router = router;
