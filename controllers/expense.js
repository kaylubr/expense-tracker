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

expenseRouter.post('/', async (request, response, next) => {
  try {
    const payload = request.body

    const newExpense = new Expense({
      title: payload.title,
      description: payload.description ? payload.description : null,
      category: payload.category,
    })

    await newExpense.save()

    response.status(201).json(newExpense)
  } catch (error) {
    next(error)
  }
})

module.exports = expenseRouter