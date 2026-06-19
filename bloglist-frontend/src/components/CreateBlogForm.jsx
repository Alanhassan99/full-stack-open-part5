import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleCreation = async () => {
    event.preventDefault()
    const objecto = {
      title,
      author,
      url
    }
    createBlog(objecto)
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div>
      <form onSubmit={handleCreation}>
        <h1>create new</h1>
        <div>
          <label>
            title: <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author: <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url: <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div >

  )
}
export default CreateBlogForm