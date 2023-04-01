const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/Dashboard", async function (req, res, next) {
    try {

    } catch (err) {
        return next(err)
    }
});

exports.router = router;
