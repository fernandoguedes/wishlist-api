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
    schema: customersSchema.addCustomerSchema,
    handler: customersController.addCustomer
  },
]

module.exports = routes
