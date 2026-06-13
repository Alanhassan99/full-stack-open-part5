const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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