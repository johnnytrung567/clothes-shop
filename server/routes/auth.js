const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { verifyToken } = require('../middleware/auth')

// Check if user signed in
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId }).select('-password')
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

router.post('/signup', async (req, res) => {
    const { username, password, fullname } = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        })
    } else if (!fullname) {
        return res.status(400).json({
            success: false,
            message: 'Missing fullname',
        })
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            })
        }

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPassword,
            fullname,
        })
        await newUser.save()

        // Return access token
        const accessToken = jwt.sign(
            { userId: newUser._id, position: 0 },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        })
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password',
            })
        }
        // Check password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect username or password',
            })
        }

        // All good
        // Return access token
        const accessToken = jwt.sign(
            { userId: user._id, position: user.position },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: 'User signed in successfully',
            accessToken,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
