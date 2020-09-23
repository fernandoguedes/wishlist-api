const fastify = require('fastify')
const routes = require('./routes')
const swagger = require('./config/swagger')

const build = (opts = {}) => {
  const app = fastify(opts)

  app.register(require('fastify-swagger'), swagger.options)

  routes.forEach(route => app.route(route))

  return app
}

module.exports = build