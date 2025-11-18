const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_KEY } = require('./config')

const getToken = (request, response, next) => {
  const token = request.get('authorization')
  if (token && token.startsWith('Bearer ')) {
    request.token = token.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const token = jwt.verify(request.token, JWT_KEY)
    const user = await User.findById(token.id)
    request.user = user
  } catch (error) {
    console.error(error)
  }

  next()
}

module.exports = { userExtractor, getToken }