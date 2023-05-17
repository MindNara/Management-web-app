const express = require("express");
const pool = require("../config");
const upload = require('../multer');
const router = express.Router();
const Joi = require('joi');

const schemaInsert = Joi.object({
    name_note: Joi.string().required().max(100),
    date_note: Joi.date().required(),
    data_note: Joi.string().required(),
}).unknown()

// ดึงข้อมูล note-diary
router.get('/NoteDiary/:userId', async function (req, res) {
    const user_id = req.params.userId
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
router.post('/NoteDiary/add', upload.single('note_img'), async function (req, res, next) {

    try {
        await schemaInsert.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const file = req.file;
    const noted_id = req.body.user_id;
    const noted_title = req.body.name_note;
    const noted_content = req.body.data_note;
    const noted_date = req.body.date_note
    const user_id = req.body.user_id

    console.log({noted_content, noted_id, noted_title, noted_date, user_id, file})

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (file != undefined) {
            const [data] = await pool.query('INSERT INTO note_diary(noted_date, noted_title, noted_content, noted_image, user_id) VALUES (?, ?, ?, ?, ?);',
            [noted_date, noted_title, noted_content, file.path.substr(6), user_id])
        }
        // } else {
        //     const [newUser, newUserF] = await conn.query(
        //         'UPDATE user SET fname=?, lname=?, email=?, password=? WHERE user_id = ?',
        //         [fname, lname, email, password, user_id]
        //     )
        // }
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
