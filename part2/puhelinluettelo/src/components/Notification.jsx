import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === 'error') {
    return <div className="error">{message}</div>
  }

  if (type === 'success') {
    return <div className="success">{message}</div>
  }
}
Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default Notification
