const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const { isLoggedIn } = require('../middlewares')


router.get('/Dashboard', isLoggedIn, async function (req, res, next) {

    const user_id = req.user.user_id;
    console.log(user_id);

    try {

        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ? AND schedule_date = ?",
            [user_id, todayDate]);

        const [taskTodo, fieldsT] = await pool.query("SELECT *, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date FROM to_do_list  WHERE user_id =? and list_status = 0", [user_id])
        
        const [taskDone, fieldsD] = await pool.query("SELECT *, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date FROM to_do_list  WHERE user_id =? and list_status = 1", [user_id])

        const [note, noteF] = await pool.query("SELECT noted_id, DATE_FORMAT(noted_date, '%Y-%m-%d') as noted_date, noted_title, noted_content, noted_image FROM note_diary WHERE user_id = ?",
            [user_id]);

        res.json({
            scheduleToday: scheduleToday,
            taskTodo: taskTodo,
            taskDone: taskDone,
            note: note,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})

exports.router = router;
