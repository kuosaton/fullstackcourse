import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState({
    message: null,
    isSuccess: true,
  })

  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const showNotification = (message, isSuccess) => {
    console.log(message, isSuccess)
    setNotification({ message, isSuccess })
    setTimeout(() => {
      setNotification({ message: null, isSuccess: true })
    }, 5000)
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        showNotification(`Failed to fetch blogs due to ${error}`, false)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = { title, author, url, likes: 0 }
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogFormVisible(false)

      showNotification(`Successfully created blog ${returnedBlog.title}!`, true)
    } catch (error) {
      const status = error.response?.status
      const backendMessage = error.response?.data?.error

      if (status === 400) {
        showNotification(
          `Failed to create blog: Invalid input. ${backendMessage}`,
          false
        )
      } else {
        showNotification(
          `Failed to create blog: Error code ${status}, reason: ${backendMessage}`,
          false
        )
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setBlogFormVisible(false)

      showNotification(`Successfully logged in!`, true)
    } catch (error) {
      const status = error.response?.status
      const backendMessage = error.response?.data?.error

      if (status === 401) {
        showNotification(
          `Login failed due to incorrect credentials: ${backendMessage}`,
          false
        )
      } else {
        showNotification(
          `Login failed: Error code ${status}, reason: ${backendMessage}`,
          false
        )
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotification(`You have logged out.`, true)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification
        message={notification.message}
        isSuccess={notification.isSuccess}
      />

      {!user && loginForm()}
      {user && (
        <div>
          Logged in as: {user.username}
          <form onSubmit={handleLogout}>
            <button type="submit">logout</button>
          </form>
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogFormVisible(true)}>
              create new blog
            </button>
          </div>
          <div style={showWhenVisible}>
            <h2>Create new blog</h2>
            <BlogForm
              onSubmit={addBlog}
              title={title}
              author={author}
              url={url}
              onTitleChange={(event) => setTitle(event.target.value)}
              onAuthorChange={(event) => setAuthor(event.target.value)}
              onUrlChange={(event) => setUrl(event.target.value)}
            />
            <button onClick={() => setBlogFormVisible(false)}>cancel</button>
          </div>
        </div>
      )}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Blog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
