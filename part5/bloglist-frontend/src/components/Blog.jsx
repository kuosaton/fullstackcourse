import { useState } from 'react'

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  console.log(blog.user)
  console.log(user)

  const blogUserId = blog.user?.id || blog.user?._id || blog.user
  const loggedUserId = user?.id || user?._id
  const canModify =
    blogUserId &&
    loggedUserId &&
    blogUserId.toString() === loggedUserId.toString()

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={() => setVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
          {blog.title} <button onClick={() => setVisible(false)}>hide</button>
        </div>

        <div>{blog.url}</div>

        <div>
          likes {blog.likes}{' '}
          <button type="button" onClick={onLike}>
            like
          </button>
        </div>

        <div>{blog.author}</div>

        {canModify && (
          <button type="button" onClick={onDelete}>
            delete blog
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
