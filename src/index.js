const mongoose = require('./config/mongoose').connection()

const server = require('./app')({
  logger: {
    prettyPrint: true
  }
})

server.listen(3000, (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})