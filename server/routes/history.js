const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')

// Add paid bag to history
router.post('/', verifyToken, async (req, res) => {
    const { bag } = req.body
    if (!bag || bag.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Missing paid bag',
        })
    }

    try {
        // Filter some information
        const mappedBag = bag.map(item => {
            return {
                product: item.product._id,
                quantity: item.quantity,
                time: Date.now(),
            }
        })

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $push: { history: { $each: mappedBag, $sort: { time: -1 } } } },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Add paid bag to history successfully',
            history: updatedUser.history,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get history
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate(
            'history.product',
            ['name', 'price', 'image', 'discount']
        )
        res.json({ success: true, history: user.history })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Delete product from bag
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        // Check if history exists
        const historyProduct = await User.findOne({
            _id: req.userId,
            'history._id': req.params.id,
        })
        if (!historyProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product not found in history',
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { history: { _id: req.params.id } } },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Delete history successfully',
            history: updatedUser.history,
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
