const express = require("express");
const pool = require("../config");
const router = express.Router();

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

exports.router = router;
