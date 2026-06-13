const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const initialBlogs = [{
  title: "theBlog",
  author: "theGuy",
  url: "thisURL",
  likes: 7
},
{
  title: "theBlogG",
  author: "theGuyY",
  url: "thisURLL",
  likes: 9
}
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "tS" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}