const express = require('express')
const router = express.Router()
const cheerio = require('cheerio')
const axios = require('axios')
const cloudinary = require('../utils/cloudinary')
const Product = require('../models/Product')

// Scrape from websites and add to DB
const urlApi = 'https://www2.hm.com/en_us/kids/boys/clothing.html'

router.get('/', async (req, res) => {
    let products = []
    try {
        const result = await axios.get(urlApi)
        const html = result.data
        const $ = cheerio.load(html)

        $('.hm-product-item', html).each(function () {
            const url = 'https://www2.hm.com/' + $(this).find('a').attr('href')
            const image = 'https:' + $(this).find('a > img').attr('data-src')
            const name = $(this)
                .find('.item-details > .item-heading > a')
                .text()
            const price = Number(
                $(this)
                    .find('.item-details > .item-price > span')
                    .text()
                    .split(' ')[1]
            )

            products.push({ name, price, image, url })
        })

        // Get field description
        const length = products.length

        for (let i = 0; i < length; i++) {
            const result = await axios.get(products[i].url)
            const html = result.data
            const $ = cheerio.load(html)

            const description = $('meta[name="description"]', html).attr(
                'content'
            )
            products[i].description = description
        }

        // Get some products
        for (let i = 0; i < 13; i++) {
            // Skip duplicate product
            if (i === 4) continue

            try {
                // Upload image to cloudinary
                const result = await cloudinary.uploader.upload(
                    products[i].image,
                    {
                        folder: 'clothes-shop/kids',
                    }
                )

                // Add product to DB
                const newProduct = new Product({
                    name: products[i].name,
                    price: products[i].price,
                    description: products[i].description,
                    image: {
                        publicId: result.public_id,
                        url: result.secure_url,
                    },
                    extra: 'Boys',
                    category: '62e3e77a66f3d6acf50114ea',
                })
                await newProduct.save()
                console.log(`Auto add product ${i + 1} success`)
            } catch (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: `Auto add product ${i + 1} failed`,
                })
            }
        }

        res.json({ success: true, message: 'Auto add product finished' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})
