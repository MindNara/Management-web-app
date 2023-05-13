const pool = require("../config");

async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) { // part2 => token
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT user_id, fname, lname, email, username, image_user FROM user WHERE user_id = ?', [token.user_id] // => เอา token ของ user.id ไป query ทำให้ทุก route มันเข้าถึง req ของ user ได้หมด ข้อมูล user ไปหน้าอื่นหมด
    )
    req.user = users[0]

    next()
}

module.exports = {
    logger,
    isLoggedIn
}