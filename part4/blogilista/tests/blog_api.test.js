const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there are initially blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are returned with id as the identifying field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  describe('adding a new blog', () => {
    test('succeeds with valid inputs', async () => {
      const newBlog = {
        title: 'Physics 2',
        author: 'Albert Einstein',
        url: 'example.com/albert-new-cool-paper-abstract.html',
        likes: 267,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const title = blogsAtEnd.map((blog) => blog.title)
      assert(title.includes('Physics 2'))
    })

    test('succeeds without specifying likes by defaulting to 0', async () => {
      const newBlog = {
        title: 'Physics 2',
        author: 'Albert Einstein',
        url: 'example.com/albert-new-cool-paper-abstract.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const likes = blogsAtEnd.map((blog) => blog.likes)
      console.log(typeof likes)
      assert.strictEqual(likes.at(-1), 0)
    })

    test('fails with code 400 if title is not specified', async () => {
      const newBlog = {
        author: 'Albert Einstein',
        url: 'example.com/albert-new-cool-paper-abstract.html',
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('fails with code 400 if url is not specified', async () => {
      const newBlog = {
        title: 'Physics 2',
        author: 'Albert Einstein',
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })
  })

  describe('deleting a blog', () => {
    test('succeeds with code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map((blog) => blog.id)
      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: 'Physics 2',
        author: 'Albert Einstein',
        url: 'example.com/albert-new-cool-paper-revised-abstract.html',
        likes: 267,
      }
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const oldUrl = blogsAtStart.map((blog) => blog.url)
      const newUrl = blogsAtEnd.map((blog) => blog.url)
      assert.notEqual(oldUrl, newUrl)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
