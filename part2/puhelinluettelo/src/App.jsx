import { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKey, setKeyword] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterKeyUpdate = (event) => {
    setKeyword(event.target.value);
  };

  const handleRemove = (event) => {
    const id = event.target.value;
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete person? ${person.name}`)) {
      personService.remove(id);
    }
  };

  const personsToShow = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(filterKey.toLowerCase()) ||
      person.number.includes(filterKey)
  );

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
  );
};

export default App;
