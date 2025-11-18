const express = require('express')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config.js')
const expenseRouter = require('./controllers/expense.js')
const userRouter = require('./controllers/user.js')

const app = express()

mongoose.connect(MONGODB_URI)
  .catch(error => console.log(error))

app.use(express.json())
app.use('/api/expenses', expenseRouter)
app.use('/api/users', userRouter)

module.exports = app