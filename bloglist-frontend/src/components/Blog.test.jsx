import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import { vi } from 'vitest'
vi.mock('../services/blogs')

describe('testing the component', () => {
  test('show title and author by default', () => {
    const blog = {
      title: 'Whatsup',
      author: 'theMan',
      url: 'www.jfosdjfs.com',
      likes: 7,
    }

    render(<Blog blog={blog} />)

    const element = screen.getByTestId('titleAuthorTest')

    expect(element.textContent).toEqual('Whatsup theMan')
  })

  test('show rest when button is clicked', async () => {
    const blog = {
      title: 'Whatsup',
      author: 'theMan',
      url: 'www.jfosdjfs.com',
      likes: 7,
    }

    const { container } = render(<Blog blog={blog} />)
    const button = screen.getByTestId('testButton')


    await userEvent.click(button)
    expect(container.textContent).toContain('www.jfosdjfs.com')
    expect(container.textContent).toContain('7')
  })


  test('prop is called twice when like is clicked twice', async () => {

    const blog = {
      title: 'Whatsup',
      author: 'theMan',
      url: 'www.jfosdjfs.com',
      likes: 7,
      user: {
        id: '6a301968fe865dacb36ca259'
      }
    }
    const mockHandler = vi.fn()

    render(<Blog blog={blog} onLike={mockHandler} />)
    const button = screen.getByTestId('testButton')


    await userEvent.click(button)
    const user = userEvent.setup()
    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })



  test('clicking the button to create new blog', async () => {
    const blog = {
      title: 'whatsup',
      author: 'guyo',
      url: 'www.jelo.se'
    }

    const mockHandler = vi.fn()
    render(<CreateBlogForm createBlog={mockHandler} blog={blog} handleCreation={mockHandler} />)
    const user = userEvent.setup()

    const button = screen.getByText('create')

    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

})

