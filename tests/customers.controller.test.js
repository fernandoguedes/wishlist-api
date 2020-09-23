const build = require('../src/app')
const app = build()
const mongoose = require('../src/config/mongoose')
const customersModel = require('../src/models/customers.model')

const headers = {
  token: null 
}

describe('Customers', () => {
  beforeAll(async () => {
    await mongoose.connect()

    const auth = await app.inject({
      method: 'POST',
      url: '/auth/login',
      body: {
        email: 'admin@wishlist.com',
        password: '321mudar'
      }
    })

    const payload = JSON.parse(auth.payload)

    headers.token = payload.token 
  })

  afterAll(async () => {
    await customersModel.deleteMany()
    await mongoose.close()
    app.close()
  })

  describe('Create customer', () => {
    test('responds with success on request POST /customers', async (done) => {
      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        headers,
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
      const customer = await app.inject({
        method: 'POST',
        url: '/customers',
        headers,
        body: {
          email: 'duplicate@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const response = await app.inject({
        method: 'POST',
        url: '/customers',
        headers,
        body: {
          email: 'duplicate@wishlist.com',
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
        headers,
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
        headers,
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
        headers,
        body: {
          email: 'customer@wishlist.com.br',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      const response = await app.inject({
        method: 'GET',
        headers,
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
        headers,
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
        headers,
        body: {
          email: 'wishlist@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      const responseUpdate = await app.inject({
        method: 'PUT',
        url: `/customers/${payload.id}`,
        headers,
        body: {
          email: 'lfernandoguedes@gmail.com'
        }
      })

      const responseGet = await app.inject({
        method: 'GET',
        headers,
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
        headers,
        body: {
          email: 'etal@wishlist.com',
          name: 'Wishlist et al'
        }
      })

      const payload = JSON.parse(savedCustomer.payload)

      await app.inject({
        method: 'DELETE',
        headers,
        url: `/customers/${payload.id}`
      })

      const responseGet = await app.inject({
        method: 'GET',
        headers,
        url: `/customers/${payload.id}`
      })

      expect(responseGet.statusCode).toBe(404)
      done()
    })
  })
})