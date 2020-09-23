const build = require('../src/app')
const app = build()
const mongoose = require('mongoose')
const customersModel = require('../src/models/customers.model')

describe('Customers', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/wishlist-tests', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
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

  describe('Update customer', () => {
    test('should update a customer on PUT /customers with success', async (done) => {
      const savedCustomer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'wishlist@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      const responseUpdate = await app.inject({
        method: 'PUT',
        url: `/customers/${payload.id}`,
        body: {
          email: 'lfernandoguedes@gmail.com'
        }
      })

      const responseGet = await app.inject({
        method: 'GET',
        url: `/customers/${payload.id}`
      })

      const body = JSON.parse(responseGet.body)

      expect(responseUpdate.statusCode).toBe(204)
      expect(body.email).toBe('lfernandoguedes@gmail.com')
      done()
    })
  })

  describe('Delete customer', () => {
    test('should delete a customer on DELETE /customers with success', async (done) => {
      const savedCustomer = await app.inject({
        method: 'POST',
        url: '/customers',
        body: {
          email: 'etal@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      await app.inject({
        method: 'DELETE',
        url: `/customers/${payload.id}`
      })

      const responseGet = await app.inject({
        method: 'GET',
        url: `/customers/${payload.id}`
      })

      expect(responseGet.statusCode).toBe(404)
      done()
    })
  })
})