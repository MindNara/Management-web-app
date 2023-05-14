const express = require("express");
const pool = require("../config");
const router = express.Router();
// const Joi = require('joi');

// const schemaInsert = Joi.object({ // สร้าง Joi มา check data ที่เข้ามาว่าครบยัง
//     list_date: Joi.date().required(),
//     list_act: Joi.string().required(),
// }).unknown() // ถ้าไม่ใส่มันจะ error เพราะใน body มี due_date แต่เราไม่ได้ check ในนี้อะเลยต้องใส่ไว้

router.get("/Task", async function (req, res, next) {
    try {

        // const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1");
        const [task] = await pool.query("SELECT list_id, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date, list_act, list_status, user_id FROM to_do_list JOIN user USING(user_id) WHERE user.user_id = 1");

        res.json({
            task: task,
            // user: user[0],
        })

    }
    catch (err) {
        return next(err)
    }
});

// router.post("/Task/add", async (req, res, next) => {
//     try {
//         await schemaInsert.validateAsync(req.body, { abortEarly: false}) // เอา joi ที่เราสร้างไว้มาเช็ค data ที่ได้มาจาก req.body บางครั้งมาจาก query ก็ต้องใช้ req.query
//     } catch (error) {
//         return res.status(400).send(error)
//     }

//     const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
//     await conn.beginTransaction();

//     const list_act = req.body.list_act
//     const list_date = req.body.list_date

//     console.log(list_act)
//     console.log(list_date)

//     try {
//         const [data] = await pool.query('INSERT INTO to_do_list(list_create_date, list_date, list_act, list_status, user_id) VALUES (CURRENT_TIMESTAMP, ?, ?, 0, 1);', 
//         [list_date, list_act])

//         await conn.commit()
//         res.send({
//             "message": `"สร้าง ToDo สำเร็จ"`,
//         })
//     } catch (error) {
//         await conn.rollback()
//         res.send(error)
//     }finally{
//         conn.release()
//     }
// })

exports.router = router;
