require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const JWT_KEY = process.env.JWT_KEY

module.exports = { JWT_KEY, MONGODB_URI, PORT }