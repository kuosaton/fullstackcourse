const PersonForm = ({
  addPerson,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default PersonForm
