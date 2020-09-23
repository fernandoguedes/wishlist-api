const boom = require('boom')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 's3cr3t'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@wishlist.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '321mudar'

exports.login = (req, reply) => {
  try {
    const { email, password } = req.body

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      let token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: 3600
      });

      return reply.code(200).send({ token })
    }

    reply.code(401).send()
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.validateToken = (request, reply, done) => {
  const { token } = request.headers

  if (!token) { return reply.code(401).send() }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return reply.code(401).send()
    }
  
   done() 
  })
}