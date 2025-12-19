const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

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

test('a valid blog can be added ', async () => {
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

after(async () => {
  await mongoose.connection.close()
})

test('adding a blog without specifying likes defaults to 0', async () => {
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

test('adding a blog without specifying title returns code 400', async () => {
  const newBlog = {
    author: 'Albert Einstein',
    url: 'example.com/albert-new-cool-paper-abstract.html',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('adding a blog without specifying url returns code 400', async () => {
  const newBlog = {
    title: 'Physics 2',
    author: 'Albert Einstein',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
