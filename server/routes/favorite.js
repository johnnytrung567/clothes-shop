const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const User = require('../models/User')

// Add product to favorites
router.post('/', verifyToken, async (req, res) => {
    const { productId } = req.body
    if (!productId) {
        return res.status(400).json({
            success: false,
            message: 'Missing product id',
        })
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $addToSet: { favorites: productId } },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Add product to favorites successfully',
            favorites: updatedUser.favorites,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get favorites of a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('favorites', [
            'name',
            'price',
            'image',
            'discount',
        ])
        res.json({ success: true, favorites: user.favorites })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Delete product from favorites
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        // Check if favorite product exists
        const favoriteProduct = await User.findOne({
            _id: req.userId,
            favorites: req.params.id,
        })

        if (!favoriteProduct) {
            return res.status(400).json({
                success: false,
                message: 'Favorite product not found',
            })
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { $pull: { favorites: req.params.id } },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Delete product from favorites successfully',
            favorite: updatedUser.favorites,
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
