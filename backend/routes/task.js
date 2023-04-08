const express = require("express");
const pool = require("../backend/config");
const router = express.Router();

router.get("/Task", async function (req, res, next) {
    try {
        const [task, fields] = await pool.query("SELECT * FROM to_do_list WHERE user_id = 1");
        return res.json(task);
    } 
    catch (err) {
        return next(err)
    }
});

exports.router = router;
