const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return /\S/.test(v)
      },
      message: (props) =>
        `Invalid name input: ${props.value}. Names can contain any non-whitespace characters.`,
    },
    minlength: [3, 'The minimum length for a name is 3.'],
    maxlength: [30, 'The maximum length for a name is 30.'],
    required: [true, 'A name is required.'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: (props) =>
        `Invalid phone number input: ${props.value}. Valid examples: 09-1234556 and 040-22334455.`,
    },
    minlength: [8, 'The minimum length for a phone number is 8.'],
    maxlength: [15, 'The maximum length for a phone number is 15.'],
    required: [true, 'A phone number is required.'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
