const Blog = ({ blog }) => (
  <div>
    <div>
      <strong>{blog.title}</strong> <span>by {blog.author}</span>
    </div>
    <div>{blog.likes} likes</div>
    <div>available at: {blog.url}</div>
  </div>
)

export default Blog
