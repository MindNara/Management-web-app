const express = require("express");
const pool = require("../config");
const router = express.Router();
const Joi = require('joi');


router.get('/Schedule/:userId', async function (req, res, next) {

    const user_id = req.params.userId;
    // console.log(user_id)

    try {

        // set today date
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let todayDate = year + "-" + month + "-" + date;
        const [scheduleToday, tadayF] = await pool.query("SELECT schedule_id, DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ? AND schedule_date = ?",
            [user_id, todayDate]);
        const [scheduleAll, allF] = await pool.query("SELECT schedule_id, DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE user_id = ?",
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


const schemaInsert = Joi.object({
    schedule_date: Joi.date().required(),
    schedule_act: Joi.string().required(),
}).unknown()

router.post('/Schedule', async function (req, res, next) {

    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const schedule_act = req.body.schedule_act;
    const schedule_date = req.body.schedule_date;
    const user_id = req.body.user_id;
    console.log({
        'user_id': user_id,
        'schedule_act': schedule_act,
        'schedule_date': schedule_date,
    });

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        const schedule = await conn.query('INSERT INTO schedule(schedule_date, schedule_act, user_id) VALUES(?, ?, ?)',
            [schedule_date, schedule_act, user_id]);

        conn.commit()
        console.log('Create schedule success!');

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})


router.get('/Schedule/Detail/:scheduleId', async function (req, res, next) {

    const schedule_id = req.params.scheduleId;

    try {

        const [scheduleEdit] = await pool.query("SELECT schedule_id, DATE_FORMAT(schedule_date, '%Y-%m-%d') AS schedule_date, schedule_act FROM schedule WHERE schedule_id = ?",
            [schedule_id]);

        res.json({
            scheduleEdit: scheduleEdit,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})

router.put('/Schedule/Update/:scheduleId', async function (req, res, next) {

    const schedule_id = req.params.scheduleId;
    const schedule_act = req.body.schedule_act;
    const schedule_date = req.body.schedule_date;
    console.log({
        'schedule_id': schedule_id,
        'schedule_act': schedule_act,
        'schedule_date': schedule_date,
    });

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        const schedule = await conn.query("UPDATE schedule SET schedule_date=?, schedule_act=? WHERE schedule_id = ?",
            [schedule_date, schedule_act, schedule_id]);

        await conn.commit();
        res.json("Update Schedule Success!");

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})

router.delete('/Schedule/Delete/:scheduleId', async function (req, res, next) {

    const schedule_id = req.params.scheduleId;
    // console.log(schedule_id);

    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {

        const [schedule] = await conn.query("DELETE FROM schedule WHERE schedule_id=?", [schedule_id]);

        await conn.commit();
        res.json("Delete Schedule Success!");

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})


exports.router = router;
