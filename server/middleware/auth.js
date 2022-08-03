const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Access token not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoded.userId
        req.position = decoded.position
        next()
    } catch (error) {
        console.log(error)
        return res
            .status(403)
            .json({ success: false, message: 'Invalid token' })
    }
}

const verifyTokenAndAdminAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if admin
        if (req.position !== 1) {
            return res
                .status(403)
                .json({
                    success: false,
                    message: "You're not allowed to do this action",
                })
        }
        next()
    })
}

module.exports = { verifyToken, verifyTokenAndAdminAuth }
