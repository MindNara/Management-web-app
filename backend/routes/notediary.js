const express = require("express");
const pool = require("../config");
const upload = require('../multer');
const router = express.Router();
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares')

const schemaInsert = Joi.object({
    name_note: Joi.string().required().max(100),
    date_note: Joi.date().required(),
    data_note: Joi.string().required(),
}).unknown()

// ดึงข้อมูล note-diary
router.get('/NoteDiary', isLoggedIn, async function (req, res) {
    const user_id = req.user.user_id
    try {
        const [note] = await pool.query("SELECT * FROM note_diary WHERE user_id =?", [user_id]);

        res.json({
            notes: note,
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }

})

// ดึงข้อมูล task ที่จะกดแก้ไขมาแสดง
router.get("/NoteDiary/detail/:noteId", async function (req, res, next) {
    const noted_id = req.params.noteId
    console.log(noted_id)
    try {
        const [content_note] = await pool.query("SELECT *, DATE_FORMAT(noted_date, '%Y-%m-%d') as noted_date FROM note_diary WHERE noted_id =?", [noted_id]);
        res.json({
            content_note: content_note,
        })
    }
    catch (err) {
        return next(err)
    }
});

// เพิ่ม note_diary
router.post('/NoteDiary/add',isLoggedIn, upload.single('note_img'), async function (req, res, next) {

    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const file = req.file;
    const noted_title = req.body.name_note;
    const noted_content = req.body.data_note;
    const noted_date = req.body.date_note
    const user_id = req.user.user_id
    let image = '';

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (file != undefined) {
            const [data] = await pool.query('INSERT INTO note_diary(noted_date, noted_title, noted_content, noted_image, user_id) VALUES (?, ?, ?, ?, ?);',
                [noted_date, noted_title, noted_content, file.path.substr(6), user_id])
        } else {
            image = "\\uploads\\grey.png" // ถ้าไม่เลือกรูปจะมีรูปตั้งต้นให้
            const [data] = await pool.query('INSERT INTO note_diary(noted_date, noted_title, noted_content, noted_image, user_id) VALUES (?, ?, ?, ?, ?);',
                [noted_date, noted_title, noted_content, image, user_id])
        }
        await conn.commit();
        res.json("success!");

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})

// ลบ diary note

router.delete("/NoteDiary/delete/:noteId", async (req, res, next) => {
    const noted_id = req.params.noteId
    // const user_id = req.body.user_id
    console.log(noted_id)
    // console.log(user_id)

    const conn = await pool.getConnection() // สร้าง transaction ก่อนจะไปทำการลบ
    await conn.beginTransaction();

    const [datalist] = await pool.query('SELECT * FROM note_diary WHERE noted_id =?', [noted_id]) // ดึงข้อมูลออกมาเก็บไว้เพื่อไปใช้ในตอน check ว่ามี noteid นี้ไหม

    try {
        const [todo] = await pool.query('DELETE FROM note_diary WHERE noted_id =?', [noted_id]) // ลบ todo

        await conn.commit() // ต้อง commit ด้วยเพื่อให้ทำคำสั่ง sql
        res.send({ // สำเร็จส่งออก
            "message": `ลบ Note '${datalist[0].noted_title}' สำเร็จ`,
        })

    } catch (error) { // ทำไม่สำเร็จก้จะเข้านี่ 
        conn.rollback() // ต้องมี rollbacke ด้วยเวลาทำ transaction
        res.status(404)
    } finally {
        conn.release() // ตอนจบควรมีนี่ด้วยมันจะได้หยุดจริงๆ ห้ามลืม
    }

})

router.put('/NoteDiary/edit/:noteId', upload.single('note_img_edit'), async function (req, res, next) {
    const noted_id = req.params.noteId
    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const file = req.file;
    const noted_title = req.body.name_note;
    const noted_content = req.body.data_note;
    const noted_date = req.body.date_note;

    console.log({ noted_content, noted_id, noted_title, noted_date, file })

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (file != undefined) {
            const [dataEdit] = await conn.query('UPDATE note_diary SET noted_date=?, noted_title=?, noted_content=?, noted_image=? WHERE noted_id = ?',
                [noted_date, noted_title, noted_content, file.path.substr(6), noted_id])
        } else { //ถ้าไม่เลือกรูปมาก้ไม่ต้องอัพ
            const [dataEdit, dataEditF] = await conn.query('UPDATE note_diary SET noted_date=?, noted_title=?, noted_content=? WHERE noted_id = ?',
                [noted_date, noted_title, noted_content, noted_id])
        }
        await conn.commit();
        res.json("success!");

    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }

})

exports.router = router;
