const boom = require('boom')
const customersModel = require('../models/customers.model')

exports.add = async (req, reply) => {
  try {
    const customer = new customersModel(req.body)
    const customerSaved = await customer.save()

    reply.code(201).send({ id: customerSaved._id })
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.get = async (req, reply) => {
  try {
    const id = req.params.id;
    const customer = await customersModel.findOne({ _id: id })

    if (!customer) {
      return reply.code(404).send({ error: 'Customer not found' })
    }

    reply.code(200).send({
      id: customer._id,
      name: customer.name,
      email: customer.email
    })
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.put = async (req, reply) => {
  try {
    const id = req.params.id;
    const customer = req.body

    await customersModel.findByIdAndUpdate(id, req.body)

    reply.code(204).send()
  } catch (err) {
    throw boom.boomify(err)
  }
}