const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const { title, author, url, likes } = request.body
      const user = request.user

      if (!title) {
        return response.status(400).json({ error: 'title is required' })
      }
      if (!author) {
        return response.status(400).json({ error: 'author is required' })
      }
      if (!url) {
        return response.status(400).json({ error: 'url is required' })
      }

      const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes || 0,
        user: user._id,
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user

      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).end()
      }

      if (blog.user.toString() !== user._id.toString()) {
        return response
          .status(403)
          .json({ error: 'only the creator can delete a blog' })
      }

      await Blog.findByIdAndDelete(request.params.id)

      return response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  }
)

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    return response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
