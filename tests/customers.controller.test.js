const build = require('../src/app')
const app = build()
const mongoose = require('mongoose')
const customersModel = require('../src/models/customers.model')

describe('Customers', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://root:root@localhost:27017/wishlist-tests?authSource=admin', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await customersModel.deleteMany()
    await mongoose.connection.close()
    app.close()
  })

  describe('Create customer', () => {
    test('responds with success on request POST /customers', async (done) => {
      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'customer@wishlist.com',
          name: 'Wishlist et al'
        }
      })
  
      expect(response.statusCode).toBe(201)
      expect(JSON.parse(response.body)).toHaveProperty('id')
      done()
    })
  
    test('responds with error on request POST /customers when e-mail exists', async (done) => {
      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'customer@wishlist.com',
          name: 'Wishlist et al'
        }
      })
  
      expect(response.statusCode).toBe(500)
      expect(JSON.parse(response.body)).toHaveProperty('error')
      done()
    })
  
    test('responds with error on request POST /customers when request without email field', async (done) => {
      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          name: 'Wishlist et al'
        }
      })
  
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toHaveProperty('error')
      done()
    })
  
    test('responds with error on request POST /customers when request without name field', async (done) => {
      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'Wishlist et al'
        }
      })
  
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toHaveProperty('error')
      done()
    })
  })
})