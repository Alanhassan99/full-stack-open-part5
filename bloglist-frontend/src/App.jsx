import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import styled from 'styled-components'
import { Container, AppBar, Toolbar, Button } from '@mui/material'





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const navigate = useNavigate()


  const createBlog = async (object) => {
    await blogService.post(object)
    setSuccessMessage(`a new blog ${object.title} by ${object.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    navigate('/')
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
      navigate('/')
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
    navigate('/')
  }
  const handleBlogRemove = (blogId) => {

    const filtero = blogs.filter(blog => {
      return blog.id !== blogId
    })
    setBlogs(filtero)
    navigate('/')
  }
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }
  return (
    <Container>
      <AppBar position="static" style={{ fontSize: '30px', display: 'flex', flexDirection: 'row', paddingLeft: '15px', alignItems: 'center', justifyContent: 'space-between' }}>BlogApp

        {user === null ? <Toolbar> <Button color="inherit" component={Link} to="/" sx={style}>blogs</Button>
          <Button color="inherit" component={Link} to="/login" sx={style}>login</Button></Toolbar>
          : <Toolbar><Button color="inherit" component={Link} to="/" sx={style}>blogs</Button>
            <Button color="inherit" component={Link} to="/createnewblog" sx={style}>new blog</Button>
            <Button color="inherit" component={Link} to="/" onClick={handleLogout} sx={style}>logout</Button></Toolbar>}

      </AppBar>



      <Routes>
        <Route path="/login" element={
          <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} errorMessage={errorMessage} />
        } />
        <Route path="/" element={
          <Blogs blogs={blogs} message={successMessage} />
        } />
        <Route path="/blogs/:id" element={
          <Blog blogs={blogs} handleBlogRemove={handleBlogRemove} user={user} />
        } />
        <Route path="/createnewblog" element={
          <CreateBlogForm createBlog={createBlog} />
        } />
      </Routes>
    </Container >
  )
}

export default App