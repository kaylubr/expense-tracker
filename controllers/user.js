const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

userRouter.get('/', async (_, response, next) => {
  try {
    const users = await User.find()
    response.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body
    const SALT_ROUNDS = 10
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = new User({ username, name, passwordHash })
    await newUser.save()

    response.status(201).json({ message: `User, ${username} created!`})
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter