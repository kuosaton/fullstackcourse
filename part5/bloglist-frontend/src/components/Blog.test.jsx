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

  const viewButton = screen.getByText('view')

  await user.click(viewButton)

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
  const onLike = vi.fn()
  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      user={{ id: '123' }}
      onLike={onLike}
      onDelete={() => {}}
    />
  )
  const viewButton = screen.getByText('view')
  const likeButton = screen.getByText('like')

  await user.click(viewButton)
  await user.click(likeButton)
  await user.click(likeButton)

  expect(onLike).toHaveBeenCalledTimes(2)
})
