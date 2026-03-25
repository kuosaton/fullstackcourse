import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  const { message, type } = notification
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
  notification: PropTypes.object,
}

export default Notification
