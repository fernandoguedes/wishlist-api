const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL ||
  'mongodb://root:root@localhost:27017/wishlist?authSource=admin'

const connect = async () => {
  await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })
}

const close = async () => {
  mongoose.connection.close()
}

module.exports = {
  connect,
  close
}