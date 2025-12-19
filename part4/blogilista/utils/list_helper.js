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

module.exports = {
  totalLikes,
  favoriteBlog,
}
