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
    minlength: [3, 'Nimen minimipituus on 3 merkkiä.'],
    maxlength: [30, 'Nimen maksimipituus on 30 merkkiä.'],
    required: [true, 'Nimi on pakollinen syöte.'],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: (props) =>
        `Puhelinnumero ${props.value} ei ole oikeassa muodossa. Sopivia muotoja ovat esimerkiksi 09-1234556 ja 040-22334455.`,
    },
    minlength: [8, 'Puhelinnumeron minimipituus on 3 merkkiä.'],
    maxlength: [15, 'Puhelinnumeron maksimipituus on 15 merkkiä.'],
    required: [true, 'Puhelinnumero on pakollinen syöte.'],
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
