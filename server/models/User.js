const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: { type: String, trim: true, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, trim: true, required: true },
        position: { type: Number, default: 0 },
        favorites: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
                unique: true,
            },
        ],
        bag: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                    unique: true,
                },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        history: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                    unique: true,
                },
                quantity: { type: Number, required: true },
                time: { type: Date, default: Date.now() },
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User)
