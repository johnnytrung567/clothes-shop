const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new Schema(
    {
        title: { type: String, required: true, trim: true, unique: true },
        content: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Blog', Blog)
