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

const params = {
    id: {
      type: 'string',
      required: ['id']
    } 
}

exports.get = {
  description: 'Get a customer',
  tags: ['Customer'],
  summary: 'Get customer by id',
  params,
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

exports.put = {
  description: 'Update a customer',
  tags: ['Customer'],
  summary: 'Update a customer by id',
  params,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      name: { type: 'string' }
    },
    additionalProperties: false
  }
}