const boom = require('boom')
const customersModel = require('../models/customers.model')

exports.addCustomer = async (req, reply) => {
  try {
    const customer = new customersModel(req.body)
    const customerSaved = await customer.save()

    reply.code(201).send({ id: customerSaved._id })
  } catch (err) {
    throw boom.boomify(err)
  }
}