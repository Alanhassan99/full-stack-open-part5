
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
    .catch((error) => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })
  response.status(201).json(updated)
})

module.exports = blogsRouter