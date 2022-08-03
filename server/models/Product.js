const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: { type: String, trim: true, required: true, unique: true },
        price: { type: Number, trim: true, required: true },
        description: { type: String, trim: true },
        image: {
            publicId: { type: String, required: true },
            url: { type: String, required: true },
        },
        extra: { type: String, default: null },
        discount: { type: Number, default: 0, trim: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', Product)
