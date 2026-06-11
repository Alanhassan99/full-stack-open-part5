const { test, describe } = require('node:test')
const assert = require('node:assert')
const _ = require('lodash-es')
const listHelper = require('../utils/list_helper')

describe('returnBlogWithMostLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      blogs: 2,
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, return content from that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const equal = _.omit(listWithOneBlog[0], ['_id', 'title', 'url', '__v', 'blogs'])
    assert.deepEqual(result, equal)


  })

  const emptyList = []

  test('when list is empty return that empty list', () => {
    const result = emptyList
    assert.deepEqual(result, emptyList)
  })

  const normalList = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      blogs: 4,
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      blogs: 1,
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      blogs: 10,
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      blogs: 0,
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      blogs: 20,
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      blogs: 9,
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ]


  test('when list is has many blogs, return the one with most likes', () => {
    const result = listHelper.mostLikes(normalList)
    const equal = _.omit(normalList[2], ['_id', 'title', 'url', '__v', 'blogs'])
    assert.deepEqual(result, equal)
  })
})