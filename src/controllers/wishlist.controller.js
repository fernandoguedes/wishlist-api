const boom = require('boom')
const wishlistModel = require('../models/wishlists.model')
const wishlistService = require('../services/wishlists.service')
const customersModel = require('../models/customers.model')
const { Types } = require('mongoose')
const DUPLICATE_KEY_ERROR_CODE = 11000

exports.add = async (req, reply) => {
  try {
    const body = req.body

    const product = await wishlistService.getProductById(body.product_id)
    if (!product) {
      return reply.code(404).send({ error: 'Product not found'})
    }

    const customer = await customersModel.findOne({ _id: body.customer_id })
    if (!customer) {
      return reply.code(404).send({ error: 'Customer not found'})
    }

    try {
      const wishlist = new wishlistModel(body)
      await wishlist.save()
    } catch (err) {
      if (err.code === DUPLICATE_KEY_ERROR_CODE) {
        return reply.code(422).send({ error: 'The customer already has the product'})
      }
       throw err
    }

    reply.code(201).send(product)
  } catch (err) {
    throw boom.boomify(err)
  }
}