const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../utils/config')
const User = require('../models/User')

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    const valid = user === null 
      ? null 
      : await bcrypt.compare(password, user.passwordHash)

    if (!valid) {
      return response.status(400).json({ message: 'Invalid input.' })
    }

    const payload = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '1d' })
    
    response.json({ token, username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter