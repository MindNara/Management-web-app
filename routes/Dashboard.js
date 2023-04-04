const express = require("express");
const pool = require("../config");
const router = express.Router();

router.get('/Dashboard', async function (req, res) {

    const [user, userFields] = await pool.query("SELECT * FROM user WHERE user_id = 1");

    res.render('Dashboard', {
        user: user[0]
    })
})

// router.put('/Dashboard/Profile', async function (req, res) {

//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const email = req.body.email;
//     const password = req.body.password;
//     const username = req.body.username;

//     const [newUser, newUserF] = await pool.query("UPDATE user SET fname=?, lname=?, email=?, username=?, password=?",
//         [fname, lname, email, username, password]);

// })

exports.router = router;
