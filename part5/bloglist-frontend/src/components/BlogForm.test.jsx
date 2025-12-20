import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useState } from 'react'
import BlogForm from './BlogForm'

const BlogFormWrapper = ({ handleAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <BlogForm
      onSubmit={handleAdd}
      title={title}
      author={author}
      url={url}
      onTitleChange={(e) => setTitle(e.target.value)}
      onAuthorChange={(e) => setAuthor(e.target.value)}
      onUrlChange={(e) => setUrl(e.target.value)}
    />
  )
}

test('submitting blog with valid data calls handleAdd with correct data', async () => {
  const user = userEvent.setup()
  const handleAdd = vi.fn()

  render(<BlogFormWrapper handleAdd={handleAdd} />)

  await user.type(
    screen.getByLabelText(/title/i),
    'Component testing is done with react-testing-library'
  )
  await user.type(screen.getByLabelText(/author/i), 'joulupukki')
  await user.type(screen.getByLabelText(/url/i), 'example.com')

  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleAdd).toHaveBeenCalledTimes(1)
  expect(handleAdd).toHaveBeenCalledWith({
    title: 'Component testing is done with react-testing-library',
    author: 'joulupukki',
    url: 'example.com',
  })
})
