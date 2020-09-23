exports.login = {
  description: 'Login with basic auth',
  tags: ['Auth'],
  summary: 'Login based in simple username and password',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        token: { type: 'string' }
      },
      additionalProperties: false
    }
  }
}