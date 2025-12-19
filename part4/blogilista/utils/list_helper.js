var _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((currentFavorite, current) => {
    return current.likes > currentFavorite.likes ? current : currentFavorite
  }, blogs[0])
  return favorite
}

const mostBlogs = (blogs) => {
  const counts = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(
    Object.keys(counts),
    (author) => counts[author]
  )

  return {
    author: mostBlogsAuthor,
    blogs: counts[mostBlogsAuthor],
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
