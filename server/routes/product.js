const express = require('express')
const router = express.Router()
const cloudinary = require('../utils/cloudinary')
const Product = require('../models/Product')
const Category = require('../models/Category')
const { verifyTokenAndAdminAuth } = require('../middleware/auth')

// Add new product
router.post('/', verifyTokenAndAdminAuth, async (req, res) => {
    const { name, price, description, image, extra, category } = req.body

    // Simple validation
    if (!name || !price || !image || !category) {
        return res
            .status(400)
            .json({ success: false, message: "Missing product's informations" })
    }

    try {
        // Check for existing product
        const product = await Product.findOne({ name })
        if (product) {
            return res
                .status(400)
                .json({ success: false, message: 'Product already exists' })
        }

        // Check for existing category
        const existCate = await Category.findById(category)
        if (!existCate) {
            return res
                .status(400)
                .json({ success: false, message: "Category doesn't exist" })
        }

        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: `clothes-shop/${existCate.title.toLowerCase()}`,
        })

        // Add product to DB
        const newProduct = new Product({
            name,
            price: Number(price),
            description,
            image: {
                publicId: result.public_id,
                url: result.secure_url,
            },
            extra,
            category,
        })
        await newProduct.save()

        res.json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get all products
router.get('/', async (req, res) => {
    try {
        // Find by category
        const category = req.query.category
        const cateCondition = category ? { category } : {}

        const products = await Product.find(cateCondition)
            .populate('category', 'title')
            .sort({ createdAt: -1 })
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            'category',
            'title'
        )
        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found',
            })
        }
        res.json({ success: true, product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Update product by id
router.put('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    const { name, price, description, image, extra, category } = req.body

    // Simple validation
    if (!name || !price || !image || !category) {
        return res
            .status(400)
            .json({ success: false, message: "Missing product's informations" })
    }

    try {
        // Check for existing product
        const oldProduct = await Product.findById(req.params.id)
        if (!oldProduct) {
            return res
                .status(400)
                .json({ success: false, message: 'Product not found' })
        }

        // Check for existing category
        const existCate = await Category.findById(category)
        if (!existCate) {
            return res
                .status(400)
                .json({ success: false, message: "Category doesn't exist" })
        }

        // Delete old image on cloudinary
        await cloudinary.uploader.destroy(oldProduct.image.publicId)

        // Upload new image to cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: `clothes-shop/${existCate.title.toLowerCase()}`,
        })

        // Update product in DB
        let updProduct = {
            name,
            price: Number(price),
            description,
            image: {
                publicId: result.public_id,
                url: result.secure_url,
            },
            extra,
            category,
        }
        updProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updProduct,
            { new: true }
        )

        res.json({
            success: true,
            message: 'Product updated successfully',
            product: updProduct,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Delete product by id
router.delete('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res
                .status(400)
                .json({ success: false, message: 'Product not found' })
        }

        // Delete image on cloudinary
        await cloudinary.uploader.destroy(product.image.publicId)

        const delProduct = await Product.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: 'Product deleted successfully',
            product: delProduct,
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
