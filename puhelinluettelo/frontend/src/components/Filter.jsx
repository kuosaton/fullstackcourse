import PropTypes from 'prop-types'

const Filter = ({ filterKey, handleFilterKeyUpdate }) => {
  return (
    <div>
      Filter shown numbers with:
      <input value={filterKey} onChange={handleFilterKeyUpdate} />
    </div>
  )
}
Filter.propTypes = {
  filterKey: PropTypes.string,
  handleFilterKeyUpdate: PropTypes.func,
}

export default Filter
