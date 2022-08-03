const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')

// Add product to bag
router.post('/', verifyToken, async (req, res) => {
    const { productId } = req.body
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: 'Missing product id',
        })
    }
    try {
        const user = await User.findById(req.userId)
        let duplicate = false
        user.bag.forEach(bagInfo => {
            // Product already in bag
            if (bagInfo.product.toString() === productId) {
                duplicate = true
            }
        })

        let updatedUser = []
        if (duplicate) {
            updatedUser = await User.findOneAndUpdate(
                { _id: req.userId, 'bag.product': productId },
                { $inc: { 'bag.$.quantity': 1 } },
                { new: true }
            )
        } else {
            updatedUser = await User.findByIdAndUpdate(
                req.userId,
                { $push: { bag: { product: productId } } },
                { new: true }
            )
        }

        res.json({
            success: true,
            message: 'Add product to bag successfully',
            bag: updatedUser.bag,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get products in bag
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('bag.product', [
            'name',
            'price',
            'image',
            'discount',
        ])
        res.json({ success: true, bag: user.bag })
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
        // Check if favorite product exists
        const bagProduct = await User.findOne({
            _id: req.userId,
            'bag._id': req.params.id,
        })

        if (!bagProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product not found in bag',
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { bag: { _id: req.params.id } } },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Delete product from bag successfully',
            bag: updatedUser.bag,
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
