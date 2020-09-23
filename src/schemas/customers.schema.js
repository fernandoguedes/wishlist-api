exports.add = {
  description: 'Create a new customer',
  tags: ['Customer'],
  summary: 'Creates new customer with given values',
  body: {
    type: 'object',
    required: ['email', 'name'],
    properties: {
      email: { type: 'string' },
      name: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}

exports.get = {
  description: 'Get a customer',
  tags: ['Customer'],
  summary: 'Get customer by id',
  params: {
    id: {
      type: 'string',
      required: ['id']
    } 
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
      },
      additionalProperties: false
    }
  }
}