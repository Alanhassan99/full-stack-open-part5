const express = require('express')
const Blog = require('../models/blog')
const cors = require('cors')
const { PORT } = require('../utils/config')
const app = express()
app.use(express.json())
app.use(cors())


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})