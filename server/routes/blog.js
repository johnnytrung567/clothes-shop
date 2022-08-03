const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const { verifyTokenAndAdminAuth } = require('../middleware/auth')

/* ADMIN FEATURES */
// Create new post
router.post('/', verifyTokenAndAdminAuth, async (req, res) => {
    const { title, content } = req.body
    if (!title || !content) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing title and/or content' })
    }

    try {
        const newBlog = new Blog({ title, content })
        await newBlog.save()

        res.json({
            success: true,
            message: 'Blog created successfully',
            blog: newBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Update blog by id
router.put('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    const { title, content } = req.body
    if ((!title, !content)) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing title and/or content' })
    }
    try {
        // check if blog exist
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res
                .status(400)
                .json({ success: false, message: 'Blog not found' })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        )

        res.json({
            success: true,
            message: 'Blog updated successfully',
            blog: updatedBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Delete blog by id
router.delete('/:id', verifyTokenAndAdminAuth, async (req, res) => {
    try {
        // check if blog exist
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res
                .status(400)
                .json({ success: false, message: 'Blog not found' })
        }

        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

        res.json({
            success: true,
            message: 'Blog deleted successfully',
            blog: deletedBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

/* CUSTOMER FEATURES */
// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        res.json({ success: true, blogs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// Get blog by id
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res
                .status(400)
                .json({ success: false, message: 'Blog not found' })
        }
        res.json({ success: true, blog })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
