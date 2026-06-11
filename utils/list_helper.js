const _ = require('lodash-es')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (array) => {
  return array.reduce((total, current) => current.likes + total, 0)
}
const favoriteBlog = (array) => {
  const numbers = array.map(object => object)
  const theUno = numbers.sort((a, b) => b.likes - a.likes)
  return theUno[0]
}
const mostBlogs = (array) => {
  const numbers = array.map(object => object)
  const theUno = numbers.sort((a, b) => b.blogs - a.blogs)
  return _.omit(theUno[0], ['_id', 'title', 'url', '__v', 'likes'])
}

const mostLikes = (array) => {
  const numbers = array.map(object => object)
  const theUno = numbers.sort((a, b) => b.likes - a.likes)
  return _.omit(theUno[0], ['_id', 'title', 'url', '__v', 'blogs'])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}