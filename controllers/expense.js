const expenseRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Expense = require('../models/Expense')
const User = require('../models/User')

expenseRouter.get('/', async (request, response, next) => {
  try {
    const expenses = await Expense.find().populate('user')
    response.json(expenses)
  } catch (error) {
    next(error)
  }
})

expenseRouter.get('/:id', async (request, response, next) => {
  try {
    const ID = request.params.id
    const expense = await Expense.findById(ID).populate('user')
    response.json(expense)
  } catch (error) {
    next(error)
  }
})

expenseRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const payload = request.body

    const newExpense = new Expense({
      title: payload.title,
      description: payload.description ? payload.description : null,
      category: payload.category,
      user: request.user
    })

    const user = await User.findById(request.user._id)
    user.expenses = user.expenses.concat(newExpense)

    await newExpense.save()
    await user.save()

    response.status(201).json(newExpense)
  } catch (error) {
    next(error)
  }
})

expenseRouter.put('/update/:id', async (request, response, next) => {
  try {
    const ID = request.params.id
    const expense = await Expense.findById(ID)
    
    const { title, description, category, status } = request.body

    await Expense.findByIdAndUpdate(ID, {
      title: title ? title : expense.title,
      description: description ? description : expense.description,
      category: category ? category : expense.category,
      status: status ? status : expense.status,
    })

    response.json({ message: `Successfully updated ${expense.title}`})
  } catch (error) {
    next(error)
  }
})

expenseRouter.delete('/:id', async (request, response, next) => {
  try {
    const ID = request.params.id
    const expense = await Expense.findOneAndDelete(ID)
    response.json({ message: `Successfully deleted ${expense.title}`})
  } catch (error) {
    next(error)
  }
})


module.exports = expenseRouter