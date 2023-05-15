const express = require("express");
const pool = require("../config");
const router = express.Router();
const upload = require('../multer');

router.post('/Profile', upload.single('user_img'), async function (req, res, next) {

    const file = req.file;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const user_id = req.body.user_id;

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        if (file != undefined) {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, email=?, password=?, image_user=? WHERE user_id = ?',
                [fname, lname, email, password, file.path.substr(6), user_id]
            )
        } else {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, email=?, password=? WHERE user_id = ?',
                [fname, lname, email, password, user_id]
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
