const PORT = process.env.PORT || 3000

const server = require('./app')({
  logger: {
    prettyPrint: true
  }
})

server.listen(PORT, '0.0.0.0', async (err) => {
  const mongoose = await require('./config/mongoose').connect()

  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})