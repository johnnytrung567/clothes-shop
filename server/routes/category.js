const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const Product = require('../models/Product')
const { verifyTokenAndAdminAuth } = require('../middleware/auth')

// Add new category
router.post('/', verifyTokenAndAdminAuth, async (req, res) => {
    const { title } = req.body

    // Simple validation
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing title of category' })
    }

    try {
        // Check for existing category
        const category = await Category.findOne({ title })
        if (category) {
            return res
                .status(400)
                .json({ success: false, message: 'Category already exists' })
        }

        const newCate = new Category({ title })
        await newCate.save()
        res.json({
            success: true,
            message: 'Category created successfully',
            category: newCate,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 })
        res.json({ success: true, categories })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Update category by id
router.put('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    const { title } = req.body

    // Simple validation
    if (!title) {
        return res.status(400).json({
            success: false,
            message: 'Missing title of category',
        })
    }
    try {
        const updCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true }
        )
        if (!updCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category not found',
            })
        }
        res.json({
            success: true,
            message: 'Category updated successfully',
            category: updCategory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Delete category by id
router.delete('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    try {
        // Check if category exists
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found',
            })
        }

        // Check if category contains products
        const products = await Product.find({ category: category._id })
        if (products.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Can't delete category because it contains products",
            })
        }

        // All good
        const delCategory = await Category.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: 'Category deleted successfully',
            category: delCategory,
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
