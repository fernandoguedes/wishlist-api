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

  describe('Get customer', () => {
    test('responds with success on request GET /customers when customer exists', async (done) => {
      const savedCustomer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'customer@wishlist.com.br',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      const response = await app.inject({
        method: 'GET',
        url: `/customers/${payload.id}`
      })

      const body = JSON.parse(response.body)
  
      expect(response.statusCode).toBe(200)
      expect(body).toHaveProperty('id')
      expect(body).toHaveProperty('name')
      expect(body).toHaveProperty('email')
      done()
    })

    test('responds with 404 on request GET /customers when customer id not exists', async (done) => {
      const response = await app.inject({
        method: 'GET',
        url: `/customers/5f6a9e29fc90181c23e37c68`
      })

      const body = JSON.parse(response.body)
  
      expect(response.statusCode).toBe(404)
      expect(body).toHaveProperty('error')
      done()
    })
  })
})