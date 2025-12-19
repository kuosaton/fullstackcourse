const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.likes
  }
  return blogs.reduce(reducer, 0)
}

module.exports = {
  totalLikes,
}
