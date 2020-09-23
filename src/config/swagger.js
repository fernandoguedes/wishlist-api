const HOST = process.env.HOST || 'localhost:3000'

exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Wishlist API',
      description: 'A amazing API to manage wishlists of our customers',
      version: '1.0.0'
    },
    host: HOST,
    schemes: ['http, https'],
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

