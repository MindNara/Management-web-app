const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const router = express.Router();


// check username
const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT username FROM user WHERE username = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This user is already'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    fname: Joi.string().required().max(150),
    lname: Joi.string().required().max(150),
    email: Joi.string().required().email(),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    password: Joi.string().required().min(8)
})

router.post('/Signup', async (req, res, next) => {
    console.log(req.body)

    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).json(err)
    }

    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [newUser] = await conn.query('INSERT INTO user(fname, lname, email, username, password) VALUES (?, ?, ?, ?, ?)',
            [fname, lname, email, username, password]
        )
        conn.commit()
        console.log('Sign Up success!');
    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }
})

exports.router = router;
