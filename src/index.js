const server = require('./app')({
  logger: {
    prettyPrint: true
  }
})

server.listen(3000, async (err) => {
  const mongoose = await require('./config/mongoose').connect()

  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})