const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tonykuosa:${password}@cluster0.imvp1.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
    process.exit(0)
  })
} else {
  const person_name = process.argv[3]
  const person_number = process.argv[4]

  const person = new Person({
    name: person_name,
    number: person_number,
  })

  person
    .save()
    .then(() => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
      process.exit(0)
    })
    .catch((error) => {
      console.log('An error occurred with adding given person:', error)
    })
}
