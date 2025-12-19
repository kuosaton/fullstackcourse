import PropTypes from 'prop-types'

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
PersonForm.propTypes = {
  addPerson: PropTypes.func,
  newName: PropTypes.string,
  handleNewName: PropTypes.func,
  newNumber: PropTypes.string,
  handleNewNumber: PropTypes.func,
}

export default PersonForm
