const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
})