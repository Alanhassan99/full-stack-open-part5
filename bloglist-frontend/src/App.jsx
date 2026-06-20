import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div style={{ color: 'red' }}>{message}</div>
}
const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div style={{ color: 'green' }}>{message}</div>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const BlogFormRef = useRef()



  const createBlog = async (object) => {
    await blogService.post(object)
    setSuccessMessage(`a new blog ${object.title} by ${object.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 1000)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    BlogFormRef.current.toggleVisibility()
  }

  const createBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='create new blog' ref={BlogFormRef}>
          <CreateBlogForm createBlog={createBlog} /></Togglable>
      </div>

    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const handleBlogRemove = (blogId) => {

    const filtero = blogs.filter(blog => {
      return blog.id !== blogId
    })
    setBlogs(filtero)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
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
  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  if (user) {
    return (
      <div>
        <h1>Blogs</h1>
        <SuccessNotification message={successMessage} />
        <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
        {createBlogForm()}
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} handleBlogRemove={handleBlogRemove} />
          )
        }
      </div>
    )
  }


}
export default App