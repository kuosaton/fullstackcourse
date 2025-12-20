import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog only displays title by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'joulupukki',
    url: 'example.com',
    likes: 246,
    user: { username: 'user', name: 'Testi Käyttäjä', id: '123' },
  }

  render(<Blog blog={blog} user={{ id: '123' }} />)
  expect(screen.getAllByText(blog.title)[0]).toBeVisible()
  expect(screen.getAllByText(blog.author)[0]).not.toBeVisible()
  expect(screen.getByText(blog.url)).not.toBeVisible()
  expect(screen.getByText(`likes ${blog.likes}`)).not.toBeVisible()
})

test('blog displays author, url, and likes when expanded', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'joulupukki',
    url: 'example.com',
    likes: 246,
    user: { username: 'user', name: 'Testi Käyttäjä', id: '123' },
  }

  const user = userEvent.setup()
  render(<Blog blog={blog} user={{ id: '123' }} />)

  await user.click(screen.getByText('view'))

  expect(screen.getByText(blog.author)).toBeVisible()
  expect(screen.getByText(blog.url)).toBeVisible()
  expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible()
})

test('pressing like twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'joulupukki',
    url: 'example.com',
    likes: 246,
    user: { username: 'user', name: 'Testi Käyttäjä', id: '123' },
  }

  const mockLikeHandler = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      user={{ id: '123' }}
      onLike={mockLikeHandler}
      onDelete={() => {}}
    />
  )

  await user.click(screen.getByText('view'))

  const likeButton = screen.getByRole('button', { name: 'like' })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})
