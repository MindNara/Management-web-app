const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt')
const router = express.Router();
const upload = require('../multer');
const Joi = require('joi');
const { isLoggedIn } = require('../middlewares')


router.get('/Profile', isLoggedIn, async function (req, res, next) {

    const user = req.user;
    console.log(req.user);

    res.json({
        user: user,
    })

})

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const schemaUpdate = Joi.object({
    fname: Joi.string().required().max(150),
    lname: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
}).unknown()

router.put('/Profile', upload.single('user_img'), async function (req, res, next) {

    try {
        await schemaUpdate.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
        return res.status(400).send(error)
    }

    const file = req.file;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    let password = req.body.password
    const user_id = req.body.user_id;

    // เช็ค password เปลี่ยน -> ถ้าเปลี่ยนให้ hash password
    if (password != 'AaBb1234') {
        password = await bcrypt.hash(req.body.password, 5)
    }

    console.log({
        'fname': fname,
        'lname': lname,
        'username': username,
        'password': password,
        'user_id': user_id,
    })

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {

        // ถ้า password เปลี่ยน -> update password
        if (password != 'AaBb1234') {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET password=? WHERE user_id = ?',
                [password, user_id]
            )
        }

        if (file != undefined) {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, username=?, image_user=? WHERE user_id = ?',
                [fname, lname, username, file.path.substr(6), user_id]
            )
        } else {
            const [newUser, newUserF] = await conn.query(
                'UPDATE user SET fname=?, lname=?, username=? WHERE user_id = ?',
                [fname, lname, username, user_id]
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
