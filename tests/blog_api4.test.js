const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
})