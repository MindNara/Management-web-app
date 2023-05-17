const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt')
const router = express.Router();
const upload = require('../multer');
const Joi = require('joi');


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
    email: Joi.string().required().email(),
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
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 5)
    const user_id = req.body.user_id;

    console.log({
        'fname': fname,
        'lname': lname,
        'email': email,
        'password': password,
        'user_id': user_id,
    })

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
