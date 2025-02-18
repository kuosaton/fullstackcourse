const express = require("express")
const morgan = require("morgan")
const app = express()

require("dotenv").config()

const Person = require("./models/person")

let persons = []

app.use(express.json())
app.use(morgan("tiny"))

const cors = require("cors")
app.use(cors())

app.use(express.static("dist"))

const unknownEndpoint = (request, response) => {
   response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
   console.error(error.message)

   if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" })
   }

   next(error)
}

app.get("/", (request, response) => {
   response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
   Person.find({}).then((persons) => {
      response.json(persons)
   })
})

app.get("/info", (request, response, next) => {
   const date = new Date()
   Person.find({})
      .then((persons) => {
         const amount = persons.length || 0
         response.send(
            `<p>Phonebook has info for ${amount} people</p>
          <p>${date}</p>`
         )
      })
      .catch((error) => next(error))
})

app.get("/api/persons/:id", (request, response, next) => {
   Person.findById(request.params.id)
      .then((person) => {
         if (person) {
            response.json(person)
         } else {
            response.status(404).end()
         }
      })
      .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
   Person.findByIdAndDelete(request.params.id)
      .then((person) => {
         if (person) {
            response.status(204).end()
         } else {
            response.status(404).end()
         }
      })
      .catch((error) => next(error))
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
   }

   const person = new Person({
      id: generateId(),
      name: body.name,
      number: body.number,
   })

   person.save().then((savedPerson) => {
      response.json(savedPerson)
   })
})

app.put("/api/persons/:id", (request, response, next) => {
   const body = request.body

   const person = {
      name: body.name,
      number: body.number,
   }

   Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then((updatedPerson) => {
         if (updatedPerson) {
            response.json(updatedPerson)
         } else {
            return response.status(404).json({ error: "Person not found" })
         }
      })
      .catch((error) => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
