import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, handleBlogRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 10
  }
  const [likes, setLikes] = useState(blog.likes)
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog)
      handleBlogRemove(blog.id)
    }
  }
  const handleLike = () => {
    let newi = likes + 1
    setLikes(newi)
    const object = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newi
    }
    blogService.put(object)
  }
  const [view, setView] = useState(false)
  if (!view) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <button onClick={() => setView(true)}>view</button>
      </div>
    )
  }
  else if (view && user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={() => setView(false)}>hide</button></div> <div>{blog.url}</div> <div>likes {likes} <button onClick={handleLike}>like</button></div><div>{blog.author}</div><div><button onClick={handleRemove}>remove</button></div>
      </div>

    )

  }
  else {
    return (
      <div style={blogStyle}>
        <div>{blog.title}<button onClick={() => setView(false)}>hide</button></div> <div>{blog.url}</div> <div>likes {likes} <button onClick={handleLike}>like</button></div><div>{blog.author}</div>
      </div>

    )

  }


}



export default Blog