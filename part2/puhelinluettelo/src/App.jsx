import { useState, useEffect } from "react"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import personService from "./services/person"
import Notification from "./components/Notification"
import "./index.css"

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState("")
   const [newNumber, setNewNumber] = useState("")
   const [filterKey, setKeyword] = useState("")
   const [errorMessage, setErrorMessage] = useState(null)
   const [successMessage, setSuccessMessage] = useState(null)

   useEffect(() => {
      personService.getAll().then((initialPersons) => {
         setPersons(initialPersons)
      })
   }, [])

   const handleNewName = (event) => {
      setNewName(event.target.value)
   }

   const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
   }

   const handleFilterKeyUpdate = (event) => {
      setKeyword(event.target.value)
   }

   const handleRemove = (event) => {
      const id = event.target.value
      const person = persons.find((n) => n.id === id)
      if (window.confirm(`Delete person? ${person.name}`)) {
         personService
            .remove(id)
            .then(() => {
               setPersons(persons.filter((n) => n.id !== id))
               setSuccessMessage(`Deleted ${person.name}`)
               setTimeout(() => {
                  setSuccessMessage(null)
               }, 5000)
            })
            .catch((error) => {
               setErrorMessage(
                  `Person '${person.name}' was already removed from server`
               )
               setTimeout(() => {
                  setErrorMessage(null)
               }, 5000)
               setPersons(persons.filter((n) => n.id !== id))
            })
      }
   }

   const handleUpdate = (newName, newNumber) => {
      const person = persons.find((n) => n.name === newName)
      const changedPerson = { ...person, number: newNumber }
      const id = person.id

      personService
         .update(id, changedPerson)
         .then((returnedPerson) => {
            setPersons(
               persons.map((person) =>
                  person.id !== id ? person : returnedPerson
               )
            )
         })
         .catch((error) => {
            setErrorMessage(
               `Person '${person.name}' was already removed from server`
            )
            setTimeout(() => {
               setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter((n) => n.id !== id))
         })
   }

   const personsToShow = persons.filter(
      (person) =>
         person.name.toLowerCase().includes(filterKey.toLowerCase()) ||
         person.number.includes(filterKey)
   )

   const addPerson = (event) => {
      event.preventDefault()

      const personObject = {
         name: newName,
         number: newNumber,
      }

      if (persons.some((person) => person.name === newName)) {
         if (
            window.confirm(
               `${newName} is already added to phonebook, replace the old number with a new one?`
            )
         ) {
            handleUpdate(newName, newNumber)
            setSuccessMessage(`Updated ${newName} number to ${newNumber}`)
            setTimeout(() => {
               setSuccessMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
         }
      } else {
         personService.create(personObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setSuccessMessage(`Added ${newName}`)
            setTimeout(() => {
               setSuccessMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
         })
      }
   }

   return (
      <div>
         <h2>Phonebook</h2>
         <Notification message={errorMessage} type={"error"} />
         <Notification message={successMessage} type={"success"} />
         <Filter
            filterKey={filterKey}
            handleFilterKeyUpdate={handleFilterKeyUpdate}
         />

         <h3>Add new contact</h3>
         <PersonForm
            addPerson={addPerson}
            newName={newName}
            handleNewName={handleNewName}
            newNumber={newNumber}
            handleNewNumber={handleNewNumber}
         />

         <h3>Numbers</h3>
         {personsToShow.map((person) => (
            <Person
               key={person.id}
               name={person.name}
               number={person.number}
               handleRemove={handleRemove}
               id={person.id}
            />
         ))}
      </div>
   )
}

export default App
