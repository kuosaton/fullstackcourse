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

const mostLikes = (blogs) => {
  const authorsGrouped = _.groupBy(blogs, 'author')
  const authorLikes = _.map(authorsGrouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes'),
  }))

  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
