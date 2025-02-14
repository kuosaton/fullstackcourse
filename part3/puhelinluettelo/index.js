const express = require("express")
const morgan = require("morgan")
const app = express()

require('dotenv').config()

const Person = require('./models/person')

let persons = [
]

app.use(express.json())
app.use(morgan("tiny"))

const cors = require("cors")
app.use(cors())

app.use(express.static("dist"))

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: 'unknown endpoint' })
}

app.get("/", (request, response) => {
   response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
   Person.find({}).then(persons => {
      response.json(persons)
   })
})

app.get("/info", (request, response) => {
   const amount = persons.length
   const date = new Date()
   response.send(
      `<p>Phonebook has info for ${amount} people</p>
      <p> ${date} </p>`
   )
})

app.get("/api/persons/:id", (request, response) => {
   const id = request.params.id
   const person = persons.find((person) => person.id === id)

   if (person) {
      response.json(person)
   } else {
      response.status(404).end()
   }
})

app.delete("/api/persons/:id", (request, response) => {
   const id = request.params.id
   persons = persons.filter((person) => person.id !== id)

   response.status(204).end()
})

const generateId = () => {
   return `${Math.floor(Math.random() * 1000000)}`
}

app.post("/api/persons", (request, response) => {
   const body = request.body

   if (body.name === undefined) {
      return response.status(400).json({
         error: "Name missing",
      })
   } else if (body.number === undefined) {
      return response.status(400).json({
         error: "Number missing",
      })
   } else if (persons.some((person) => person.name === body.name)) {
      return response.status(400).json({
         error: "Name must be unique",
      })
   }

   const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number,
   })

   person.save().then(savedPerson => {
      response.json(savedPerson)
   })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
