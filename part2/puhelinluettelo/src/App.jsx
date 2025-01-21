import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <p>{name} {number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
    { name: 'Joulupukki', number: ''},
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterKeyword, setKeyword] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterKeyword = (event) => {
    setKeyword(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    person.number.includes(filterKeyword)
  )

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter shown numbers with: 
        <input
          value={filterKeyword}
          onChange={handleFilterKeyword}
        />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addPerson}>
          <div>name: 
          <input 
            value={newName}
            onChange={handleNewName}
          />
          </div>
          <div>number:
          <input 
            value={newNumber}
            onChange={handleNewNumber}
          />
          </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

export default App