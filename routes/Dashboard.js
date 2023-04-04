const express = require("express");
const pool = require("../config");
const path = require('path')
const multer = require('multer')
const router = express.Router();


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


router.get('/Dashboard', async function (req, res) {
    try {

        const [user, userF] = await pool.query("SELECT * FROM user WHERE user_id = 1"); // select user detail of user

        res.render('Dashboard', {
            user: user[0]
        })

    } catch (err) {
        console.log(err)
        return next(err)
    }
})

router.post('/Dashboard', upload.single('user_img'), async function (req, res) {

    const file = req.file;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {

        if (req.file != undefined) {
            const [newUser, newUserF] = await pool.query(
                'UPDATE user SET fname=?, lname=?, email=?, username=?, password=?, image_user=? WHERE user_id = 1',
                [fname, lname, email, username, password, file.path.substr(6)]
            )
        } else {
            const [newUser, newUserF] = await pool.query(
                'UPDATE user SET fname=?, lname=?, email=?, username=?, password=? WHERE user_id = 1',
                [fname, lname, email, username, password]
            )
        }
        res.redirect('Dashboard')


    } catch (err) {
        console.log(err)
        return next(err)
    }

})

exports.router = router;
