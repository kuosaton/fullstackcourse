require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI_PUBLIC = process.env.MONGODB_URI_PUBLIC // MongoDB URI with password redacted for console logging

module.exports = { MONGODB_URI, PORT, MONGODB_URI_PUBLIC }
