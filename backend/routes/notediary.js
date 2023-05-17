const express = require("express");
const pool = require("../config");
const upload = require('../multer');
const router = express.Router();
const Joi = require('joi');

const schemaInsert = Joi.object({
    noted_name: Joi.string().required().max(100),
    noted_date: Joi.date().required(),
    noted_content: Joi.string().required(),
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

// เพิ่ม note_diary

// router.post('/NoteDiary/add', upload.single('note_img'), async function (req, res, next) {

//     try {
//         await schemaInsert.validateAsync(req.body, { abortEarly: false })
//     } catch (error) {
//         return res.status(400).send(error)
//     }

//     const file = req.file;
//     const noted_id = req.body.user_id;
//     const noted_title = req.body.name_note;
//     const noted_content = req.body.data_note;
//     const noted_date = req.body.date_note

//     console.log({noted_content, noted_id, noted_title, noted_date})

//     const conn = await pool.getConnection()
//     await conn.beginTransaction();

//     try {

//         if (file != undefined) {
//             const [newUser, newUserF] = await conn.query(
//                 'UPDATE user SET fname=?, lname=?, email=?, password=?, image_user=? WHERE user_id = ?',
//                 [fname, lname, email, password, file.path.substr(6), user_id]
//             )
//         } else {
//             const [newUser, newUserF] = await conn.query(
//                 'UPDATE user SET fname=?, lname=?, email=?, password=? WHERE user_id = ?',
//                 [fname, lname, email, password, user_id]
//             )
//         }
//         await conn.commit();
//         res.json("Update profile success!");

//     } catch (err) {
//         await conn.rollback();
//         res.status(400).json(err);
//     } finally {
//         console.log('finally');
//         conn.release();
//     }

// })





exports.router = router;
