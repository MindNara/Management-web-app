const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

router = express.Router();
const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

router.post('/Login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send("Enter your email or password")
    }
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)
    console.log(password)
 
    const conn = await pool.getConnection()
    await conn.beginTransaction()
 
    try {
        // Check if email is correct
       const [users] = await conn.query('SELECT * FROM user WHERE email=?',[email])
       const user = users[0]
       if (!user) {
        throw new Error('Incorrect email or password')
        } 
       // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect email or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query('SELECT * FROM tokens WHERE user_id=?', [user.user_id])
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query('INSERT INTO tokens(user_id, token) VALUES (?, ?)', [user.user_id, token])
        }
        conn.commit()
        res.status(200).json({'token': token})
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})

exports.router = router;
