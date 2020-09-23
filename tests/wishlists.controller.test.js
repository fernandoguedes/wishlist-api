const build = require('../src/app')
const app = build()
const mongoose = require('mongoose')
const wishlistModel = require('../src/models/wishlists.model')
const customersModel = require('../src/models/customers.model')

describe('Wishlists', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://root:root@localhost:27017/wishlist-tests?authSource=admin', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await wishlistModel.deleteMany()
    await customersModel.deleteMany()

    await mongoose.connection.close()
    app.close()
  })

  describe('Add product', () => {
    test('responds with success on request POST /wishlist', async (done) => {
      const customer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'labs@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const body = JSON.parse(customer.payload)

      const wishlist = await app.inject({
        method: 'POST',
        url: '/wishlist',
        body: {
          product_id: '77be5ad3-fa87-d8a0-9433-5dbcc3152fac',
          customer_id: body.id,
        }
      })

      const parsedWishlist = JSON.parse(wishlist.payload)

      expect(wishlist.statusCode).toBe(201)
      expect(parsedWishlist).toHaveProperty('image')
      expect(parsedWishlist).toHaveProperty('price')
      expect(parsedWishlist).toHaveProperty('title')
      expect(parsedWishlist).toHaveProperty('url')

      done()
    })

    test('responds with error on request POST /wishlist when product does not exist', async (done) => {
      const customer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'guedes@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const body = JSON.parse(customer.payload)

      const wishlist = await app.inject({
        method: 'POST',
        url: '/wishlist',
        body: {
          product_id: '321abc',
          customer_id: body.id,
        }
      })

      const parsedWishlist = JSON.parse(wishlist.payload)
  
      expect(wishlist.statusCode).toBe(404)
      expect(parsedWishlist).toHaveProperty('error')

      done()
    })

    test('responds with error on request POST /wishlist when trying insert same product into wishlist', async (done) => {
      const customer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'hi@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const body = JSON.parse(customer.payload)

      const productWishlist1 = await app.inject({
        method: 'POST',
        url: '/wishlist',
        body: {
          product_id: '77be5ad3-fa87-d8a0-9433-5dbcc3152fac',
          customer_id: body.id,
        }
      })

      const productWishlist2 = await app.inject({
        method: 'POST',
        url: '/wishlist',
        body: {
          product_id: '77be5ad3-fa87-d8a0-9433-5dbcc3152fac',
          customer_id: body.id,
        }
      })

      const parsedWishlist = JSON.parse(productWishlist2.payload)
  
      expect(productWishlist2.statusCode).toBe(422)
      expect(parsedWishlist).toHaveProperty('error')

      done()
    })
  })
})