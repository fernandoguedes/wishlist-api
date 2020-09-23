exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Wishlist API',
      description: 'A amazing API to manage wishlists of our customers',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Environment',
      },
      {
        url: 'https://wishlist-api-u3gnsltg3a-uc.a.run.app',
        description: 'Production Environment',
      }
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'token',
        in: 'header'
      }
    },
    security: [
      { apiKey: [] }
    ]
  }
}

