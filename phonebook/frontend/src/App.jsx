import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterKey, setKeyword] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const showNotification = (message, type) => {
    console.log(message, type)
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

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
          setPersons((prevPersons) => prevPersons.filter((n) => n.id !== id))
          showNotification(
            `Deleted person ${person.name} successfully!`,
            'success'
          )
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            showNotification(
              `Deleting person ${person.name} failed: Person no longer exists.`,
              'error'
            )
            setPersons((prevPersons) => prevPersons.filter((n) => n.id !== id))
          } else if (error.response?.data?.error) {
            showNotification(
              `Deleting person ${person.name} failed: ${error.response.data.error}`,
              'error'
            )
          }
        })
    }
  }

  const handleUpdate = async (name, newNumber) => {
    const person = persons.find((n) => n.name === name)
    const changedPerson = { ...person, number: newNumber }
    const id = person.id

    try {
      const returnedPerson = await personService.update(id, changedPerson)

      if (returnedPerson) {
        setPersons((prevPersons) =>
          prevPersons.map((p) => (p.id !== id ? p : returnedPerson))
        )
        showNotification(
          `Updated ${name}'s number to ${newNumber} successfully!`,
          'success'
        )
      }
    } catch (error) {
      if (error.response?.status === 404) {
        showNotification(
          `Updating ${name}'s number to ${newNumber} failed: Person no longer exists.`,
          'error'
        )
        setPersons((prevPersons) => prevPersons.filter((n) => n.id !== id))
      } else if (error.response?.data?.error) {
        showNotification(
          `Updating ${name}'s number to ${newNumber} failed: ${error.response.data.error}`,
          'error'
        )
      }
      return
    }
  }

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
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Created person ${newName} successfully!`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          if (error.response?.data?.error) {
            showNotification(
              `Creating person ${newName} failed: ${error.response.data.error}`,
              'error'
            )
          }
        })
    }
  }

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filterKey.toLowerCase()) ||
      person.number.includes(filterKey)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
