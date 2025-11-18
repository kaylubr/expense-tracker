const expenseRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Expense = require('../models/Expense')

expenseRouter.get('/', userExtractor, async (request, response, next) => {
  try {
    const expenses = await Expense.find() 
    response.json(expenses)
  } catch (error) {
    next(error)
  }
})

expenseRouter.get('/:id', async (request, response, next) => {
  try {
    const ID = request.params.id
    const expense = await Expense.findById(ID)
    response.json(expense)
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