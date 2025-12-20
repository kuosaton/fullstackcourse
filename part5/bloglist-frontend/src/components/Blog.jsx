import { useState } from 'react'

const Blog = ({ blog }) => {
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
        {blog.title} <span>by {blog.author}</span>{' '}
        <button onClick={() => setVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
          <strong>{blog.title}</strong> <span>by {blog.author}</span>{' '}
          <button onClick={() => setVisible(false)}>hide</button>
        </div>

        <div>
          {blog.likes} likes <button type="button">like</button>
        </div>
        <div>available at: {blog.url}</div>
      </div>
    </div>
  )
}

export default Blog
