const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/User')
const { verifyToken, verifyTokenAndAdminAuth } = require('../middleware/auth')

/* ADMIN FEATURES */
// Get all users
router.get('/', verifyTokenAndAdminAuth, async (req, res) => {
    try {
        const users = await User.find({ position: 0 })
            .select('-password')
            .sort({ createdAt: -1 })
        res.json({ success: true, users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

/* CUSTOMER FEATURES */
// Get user by id
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
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

// Update user
router.put('/', verifyToken, async (req, res) => {
    const { fullname } = req.body

    // Simple validation
    if (!fullname) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing fullname' })
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { fullname },
            { new: true }
        ).select('-password')

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: 'User not found or user unauthorized',
            })
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Change password
router.put('/changePassword', verifyToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body

    // Simple validation
    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: 'Missing current and/or new password',
        })
    }

    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found or user unauthorized',
            })
        }

        // Check current password
        const passwordValid = await argon2.verify(
            user.password,
            currentPassword
        )
        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect current password' })
        }

        // All good
        const hashedPassword = await argon2.hash(newPassword)
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { password: hashedPassword },
            { new: true }
        ).select('-password')

        res.json({
            success: true,
            message: 'Password changed successfully',
            user: updatedUser,
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
