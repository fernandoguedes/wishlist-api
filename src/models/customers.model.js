const { Schema, model } = require('mongoose')

const customerSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: String
})

module.exports = model('customer', customerSchema)