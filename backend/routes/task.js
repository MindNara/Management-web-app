const express = require("express");
const pool = require("../config");
const router = express.Router();
const Joi = require('joi');

const schemaInsert = Joi.object({ // สร้าง Joi มา check data ที่เข้ามาว่าครบยัง
    list_date: Joi.date().required(),
    list_act: Joi.string().required(),
})

router.get("/Task/:userId", async function (req, res, next) {
    try {
        const user_id = req.params.userId
        const [task] = await pool.query("SELECT list_id, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date, list_act, list_status, user_id FROM to_do_list JOIN user USING(user_id) WHERE user.user_id =?", [user_id]);
        res.json({
            task: task,
        })
    }
    catch (err) {
        return next(err)
    }
});


router.post("/Task/add/:userId", async (req, res, next) => {
    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false}) // เอา joi ที่เราสร้างไว้มาเช็ค data ที่ได้มาจาก req.body บางครั้งมาจาก query ก็ต้องใช้ req.query
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    const user_id = req.params.userId
    const list_act = req.body.list_act
    const list_date = req.body.list_date

    console.log(user_id)
    console.log(list_act)
    console.log(list_date)

    try {
        const [data] = await pool.query('INSERT INTO to_do_list(list_create_date, list_date, list_act, list_status, user_id) VALUES (CURRENT_TIMESTAMP, ?, ?, 0, ?);', 
        [list_date, list_act, user_id])

        await conn.commit()
        res.send({
            "message": `"สร้าง ToDo สำเร็จ"`,
        })
    } catch (error) {
        await conn.rollback()
        res.send(error)
    }finally{
        conn.release()
    }
})

exports.router = router;
