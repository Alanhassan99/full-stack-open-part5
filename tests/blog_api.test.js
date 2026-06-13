const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs unique identifier is called id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.ok(response.body[0].id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "theBlogse",
    author: "theGuyse",
    url: "thisURLse",
    likes: 79,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(titles.includes("theBlogse"))
})
test('if likes properties is missing it will default to 0', async () => {
  const newBlog = {
    title: "theBlogse",
    author: "theGuyse",
    url: "thisURLse"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const theOne = response.body.find(b => b.title === "theBlogse")
  assert.strictEqual(theOne.likes, 0)
})

test('if title or url is missing respond with code 400', async () => {
  const newBlog = {
    author: "theGuyse",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert(response.status, 400)
})
test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('update the like property of a blog', async () => {
  const updatedProp = {
    likes: 11,
    url: "asdknjads",
    title: "asdads"
  }

  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedProp)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get(`/api/blogs/${blogToUpdate.id}`)
  console.log(response.body.likes)
  assert.strictEqual(response.body.likes, 11)

})

after(async () => {
  await mongoose.connection.close()
})