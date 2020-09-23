const customersController = require('../controllers/customer.controller')
const wishlistController = require('../controllers/wishlist.controller')
const customersSchema = require('../schemas/customers.schema')
const wishlistSchema = require('../schemas/wishlists.schema')

const routes = [
  {
    method: 'GET',
    url: '/healthcheck',
    handler: (_, reply) => reply.code(200).send() 
  },
  {
    method: 'POST',
    url: '/customers',
    handler: customersController.add,
    schema: customersSchema.add
  },
  {
    method: 'GET',
    url: '/customers/:id',
    handler: customersController.get,
    schema: customersSchema.get
  },
  {
    method: 'PUT',
    url: '/customers/:id',
    handler: customersController.put,
    schema: customersSchema.put
  },
  {
    method: 'DELETE',
    url: '/customers/:id',
    handler: customersController.delete,
    schema: customersSchema.delete
  },
  {
    method: 'POST',
    url: '/wishlist',
    handler: wishlistController.add,
    schema: wishlistSchema.add
  },
]

module.exports = routes
