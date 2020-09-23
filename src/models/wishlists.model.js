const { Schema, model, Types } = require('mongoose')

const wishlistSchema = new Schema({
  customer_id: {
    type: Types.ObjectId,
    ref: 'customer'
  },
  product_id: {
    type: String
  }
})

wishlistSchema.index({ 'customer_id': 1, 'product_id': 1 }, { unique: true })

module.exports = model('wishlist', wishlistSchema)