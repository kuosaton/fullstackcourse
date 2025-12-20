import { useState } from 'react'

const Blog = ({ blog, onLike }) => {
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={() => setVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
          <div>
            {' '}
            {blog.title} <button onClick={() => setVisible(false)}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} {''}
            <button type="button" onClick={onLike}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog
