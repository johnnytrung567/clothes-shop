require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const favoriteRouter = require('./routes/favorite')
const bagRouter = require('./routes/bag')
const historyRouter = require('./routes/history')
const blogRouter = require('./routes/blog')

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.p6grt.mongodb.net/clothes-shop?retryWrites=true&w=majority`
        )
        console.log('Connect MongoDB successfully')
    } catch (error) {
        console.log(error)
    }
}
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/favorites', favoriteRouter)
app.use('/api/bag', bagRouter)
app.use('/api/history', historyRouter)
app.use('/api/blogs', blogRouter)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))
