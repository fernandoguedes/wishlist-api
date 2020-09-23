const customersController = require('./controllers/customer.controller')
const wishlistController = require('./controllers/wishlist.controller')
const authController = require('./controllers/auth.controller')
const customersSchema = require('./schemas/customers.schema')
const wishlistSchema = require('./schemas/wishlists.schema')
const authSchema = require('./schemas/auth.schema')

const routes = [
  {
    method: 'GET',
    url: '/healthcheck',
    handler: (_, reply) => reply.code(200).send() 
  },
  {
    method: 'POST',
    url: '/customers',
    beforeHandler: authController.validateToken,
    handler: customersController.add,
    schema: customersSchema.add
  },
  {
    method: 'GET',
    url: '/customers/:id',
    beforeHandler: authController.validateToken,
    handler: customersController.get,
    schema: customersSchema.get
  },
  {
    method: 'PUT',
    url: '/customers/:id',
    beforeHandler: authController.validateToken,
    handler: customersController.put,
    schema: customersSchema.put
  },
  {
    method: 'DELETE',
    url: '/customers/:id',
    beforeHandler: authController.validateToken,
    handler: customersController.delete,
    schema: customersSchema.delete
  },
  {
    method: 'POST',
    url: '/wishlist',
    beforeHandler: authController.validateToken,
    handler: wishlistController.add,
    schema: wishlistSchema.add
  },
  {
    method: 'POST',
    url: '/auth/login',
    handler: authController.login,
    schema: authSchema.login
  },
]

module.exports = routes
