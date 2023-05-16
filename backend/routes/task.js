const express = require("express");
const pool = require("../config");
const router = express.Router();
const Joi = require('joi');

const schemaInsert = Joi.object({ // สร้าง Joi มา check data ที่เข้ามาว่าครบยัง
    list_date: Joi.date().greater('now').required(),
    list_act: Joi.string().required(),
}).unknown()

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


router.post("/Task/add", async (req, res, next) => {
    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false}) // เอา joi ที่เราสร้างไว้มาเช็ค data ที่ได้มาจาก req.body บางครั้งมาจาก query ก็ต้องใช้ req.query
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    
    const list_act = req.body.list_act
    const list_date = req.body.list_date
    const user_id = req.body.user_id

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

router.delete("/Task/delete/:taskId", async(req, res, next) => {
    const list_id = req.params.taskId
    // const user_id = req.body.user_id
    console.log(list_id)
    // console.log(user_id)

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    const [datalist] = await pool.query('SELECT * FROM to_do_list WHERE list_id =?', [list_id]) // ดึงข้อมูลออกมาเก็บไว้เพื่อไปใช้ในตอน check ว่ามี listid นี้ไหม
    
    if (datalist.length === 0){ // เช็คว่า params ที่เข้ามามีใน id ไหม
        return res.status(404).send({ // ส่ง status และ message
            "message" : "ไม่พบ Task ที่ต้องการลบ",
        })
    }

    try {
        const [todo] = await pool.query('DELETE FROM to_do_list WHERE list_id =?', [list_id]) // ลบ todo
        
        await conn.commit() // ต้อง commit ด้วยเพื่อให้ทำคำสั่ง sql
        res.send({ // สำเร็จส่งออก
            "message" : `ลบ ToDo '${datalist[0].list_act}' สำเร็จ`,
        })

    } catch (error) { // ทำไม่สำเร็จก้จะเข้านี่ 
        conn.rollback() // ต้องมี rollbacke ด้วยเวลาทำ transaction
        res.status(404)
    }finally{
        conn.release() // ตอนจบควรมีนี่ด้วยมันจะได้หยุดจริงๆ ห้ามลืม
    }

})

router.get("/Task/detail/:taskId", async function (req, res, next) {
    try {
        const list_id = req.params.taskId
        const [content_task] = await pool.query("SELECT *, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date FROM to_do_list WHERE list_id =?", [list_id]);
        res.json({
            content_task: content_task,
        })
    }
    catch (err) {
        return next(err)
    }
});
exports.router = router;
