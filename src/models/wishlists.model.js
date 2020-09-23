const { Schema, model } = require('mongoose')

const wishlistSchema = new Schema({
  customer_id: {
    type: String,
    unique: true
  },
  product_id: {
    type: String,
    ref: 'customer' 
  }
})

module.exports = model('wishlist', wishlistSchema)