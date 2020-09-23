const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL ||
  'mongodb://root:root@localhost:27017/wishlist?authSource=admin'

const mongooseConnection = async () => {
  await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })
}

module.exports.connection = mongooseConnection