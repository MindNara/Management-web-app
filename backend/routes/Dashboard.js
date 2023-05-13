const express = require("express");
const pool = require("../config");
const path = require('path')
const router = express.Router();
const upload = require('../multer');


router.get('/Dashboard', async function (req, res, next) {

    try {

        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = 1 AND schedule_date = ?", [todayDate]);
        const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1");
        const [task, fields] = await pool.query("SELECT list_id, DATE_FORMAT(list_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date, list_act, list_status, user_id FROM to_do_list JOIN user USING(user_id) WHERE user.user_id = 1");
        const [note, noteF] = await pool.query("SELECT * FROM note_diary WHERE user_id = 1");

        res.json({
            user: user[0],
            scheduleToday: scheduleToday,
            task: task,
            note: note,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})


router.post('/Dashboard', upload.single('user_img'), async function (req, res, next) {

    const file = req.file;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (file != undefined) {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, email=?, password=?, image_user=? WHERE user_id = 1',
                [fname, lname, email, password, file.path.substr(6)]
            )
        } else {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, email=?, password=? WHERE user_id = 1',
                [fname, lname, email, password]
            )
        }
        await conn.commit();
        res.json("Update profile success!");

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})

exports.router = router;
