const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const router = express.Router();

// check password
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

// check username
const emailValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT email FROM user WHERE email = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This email is already'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    fname: Joi.string().required().max(150),
    lname: Joi.string().required().max(150),
    email: Joi.string().required().email().external(emailValidator),
    username: Joi.string().required().min(5).max(20),
    password: Joi.string().required().custom(passwordValidator),
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
    const password = await bcrypt.hash(req.body.password, 5)

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [newUser] = await conn.query('INSERT INTO user(fname, lname, email, username, password) VALUES (?, ?, ?, ?, ?)',
            [fname, lname, email, username, password]
        )
        conn.commit()
        console.log('Sign Up success!');
        res.json('Sign Up success!')
    } catch (err) {
        await conn.rollback();
        res.status(400).json(err);
    } finally {
        console.log('finally');
        conn.release();
    }
})

exports.router = router;
