const express = require("express");
const pool = require("../config");
const router = express.Router();
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares')

const currentDate = new Date().toISOString().split('T')[0]; // วันที่ปัจจุบัน YYYY-MM-DDTHH:mm:ss.sssZ" split T เพื่อให้ได้เป็น format YYYY-MM-DD

const schemaInsert = Joi.object({ // สร้าง Joi มา check data ที่เข้ามาว่าครบยัง
    list_date: Joi.date().min(new Date(currentDate)).required(),  // เช็คว่า list_date ต้องมีค่า >= วันที่ปัจจุบัน
    list_act: Joi.string().required(),
}).unknown()

// ดึงข้อมูล task ทั้งหมดของ user นั้นๆ
router.get("/Task", isLoggedIn, async function (req, res, next) {
    try {
        const user_id = req.user.user_id
        const [taskTodo] = await pool.query("SELECT *, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date FROM to_do_list  WHERE user_id =? and list_status = 0", [user_id]);
        const [taskDone] = await pool.query("SELECT *, DATE_FORMAT(list_create_date, '%Y-%m-%d') as list_create_date, DATE_FORMAT(list_date, '%Y-%m-%d') as list_date FROM to_do_list WHERE user_id =? and list_status = 1", [user_id]);
        res.json({
            taskTodo: taskTodo,
            taskDone: taskDone
        })
    }
    catch (err) {
        return next(err)
    }
});

// เพิ่มข้อมูล task
router.post("/Task/add", isLoggedIn, async (req, res, next) => {
    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false }) // เอา joi ที่เราสร้างไว้มาเช็ค data ที่ได้มาจาก req.body บางครั้งมาจาก query ก็ต้องใช้ req.query
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();


    const list_act = req.body.list_act
    const list_date = req.body.list_date
    const user_id = req.user.user_id

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
    } finally {
        conn.release()
    }
})

// ลบข้อมูล task
router.delete("/Task/delete/:taskId", async (req, res, next) => {
    const list_id = req.params.taskId
    // const user_id = req.body.user_id
    console.log(list_id)
    // console.log(user_id)

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    const [datalist] = await pool.query('SELECT * FROM to_do_list WHERE list_id =?', [list_id]) // ดึงข้อมูลออกมาเก็บไว้เพื่อไปใช้ในตอน check ว่ามี listid นี้ไหม

    if (datalist.length === 0) { // เช็คว่า params ที่เข้ามามีใน id ไหม
        return res.status(404).send({ // ส่ง status และ message
            "message": "ไม่พบ Task ที่ต้องการลบ",
        })
    }

    try {
        const [todo] = await pool.query('DELETE FROM to_do_list WHERE list_id =?', [list_id]) // ลบ todo

        await conn.commit() // ต้อง commit ด้วยเพื่อให้ทำคำสั่ง sql
        res.send({ // สำเร็จส่งออก
            "message": `ลบ ToDo '${datalist[0].list_act}' สำเร็จ`,
        })

    } catch (error) { // ทำไม่สำเร็จก้จะเข้านี่ 
        conn.rollback() // ต้องมี rollbacke ด้วยเวลาทำ transaction
        res.status(404)
    } finally {
        conn.release() // ตอนจบควรมีนี่ด้วยมันจะได้หยุดจริงๆ ห้ามลืม
    }

})

// ดึงข้อมูล task ที่จะกดแก้ไขมาแสดง
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

// edit ข้อมูล task

router.put("/Task/edit/:taskId", async function (req, res, next) {
    const list_id = req.params.taskId
    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false }) // เอา joi ที่เราสร้างไว้มาเช็ค data ที่ได้มาจาก req.body บางครั้งมาจาก query ก็ต้องใช้ req.query
    } catch (error) {
        return res.status(400).send(error)
    }

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    const list_act = req.body.list_act
    const list_date = req.body.list_date

    console.log(list_id)
    console.log(list_act)
    console.log(list_date)

    try {
        const [dataEdit] = await pool.query('UPDATE to_do_list SET list_date=?, list_act=? WHERE list_id=?', [list_date, list_act, list_id])

        await conn.commit()
        res.send("สำเร็จ")
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});

// update checkbox ของ task
router.put("/Task/addCheck", async function (req, res, next) {
    const list_id = req.body.list_id
    const list_status = req.body.list_status

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();


    console.log("id " + list_id)
    console.log("status " + list_status)

    try {
        if (list_status === 0) {
            const [dataEdit] = await pool.query('UPDATE to_do_list SET list_status = 1 WHERE list_id=?', [list_id])
        }
        else {
            const [dataEdit] = await pool.query('UPDATE to_do_list SET list_status = 0 WHERE list_id=?', [list_id])
        }
        await conn.commit()
        res.send("สำเร็จ")
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    } finally {
        console.log('finally')
        conn.release();
    }

});


exports.router = router;
