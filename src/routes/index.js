const customersController = require('../controllers/customer.controller')
const customersSchema = require('../schemas/customers.schema')

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
]

module.exports = routes
