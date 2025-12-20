import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          Title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Url:
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
      </div>
      <button type="submit">Submit</button>
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
          <h2>Create blog</h2>
          {blogForm()}
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
