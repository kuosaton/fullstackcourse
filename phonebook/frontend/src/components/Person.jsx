import PropTypes from 'prop-types'

const Person = ({ id, name, number, handleRemove }) => {
  return (
    <p>
      {name} {number}
      <button onClick={handleRemove} value={id}>
        delete
      </button>
    </p>
  )
}
Person.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  handleRemove: PropTypes.func,
}

export default Person
