const expenseRouter = require('express').Router()
const Expense = require('../models/Expense')

expenseRouter.get('/', async (_, response, next) => {
  try {
    const expenses = await Expense.find()
    response.json(expenses)
  } catch (error) {
    next(error)
  }
})

module.exports = expenseRouter