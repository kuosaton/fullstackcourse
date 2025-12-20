const Blog = ({ blog }) => (
  <div>
    <div>
      <strong>{blog.title}</strong> <span>by {blog.author}</span>
    </div>
    <div>{blog.likes} likes</div>
    <div>
      available at:
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
    </div>
  </div>
)

export default Blog
