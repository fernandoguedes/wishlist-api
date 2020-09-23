exports.addCustomerSchema = {
  description: 'Create a new customer',
  tags: ['Customer'],
  summary: 'Creates new customer with given values',
  body: {
    type: 'object',
    required: ['email', 'name'],
    properties: {
      email: { type: 'string' },
      name: { type: 'string' }
    }
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    }
  }
}
