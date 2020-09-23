exports.add = {
  description: 'Add a product to a customer',
  tags: ['Wishlist'],
  summary: 'Add a product to a wishlist of customer with product id',
  body: {
    type: 'object',
    required: ['customer_id', 'product_id'],
    properties: {
      customer_id: { type: 'string' },
      product_id: { type: 'string' }
    },
    additionalProperties: false
  },
  response: {
    201: {
      description: 'Successful response',
      type: 'object',
      properties: {
        title: { type: 'string' },
        image: { type: 'string' },
        price: { type: 'string' },
        url: { type: 'string' },
      },
      additionalProperties: false
    }
  }
}