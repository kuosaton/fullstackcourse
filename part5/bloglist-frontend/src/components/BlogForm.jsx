const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ title, author, url })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title:
          <input type="text" value={title} onChange={onTitleChange} />
        </label>
      </div>

      <div>
        <label>
          author:
          <input type="text" value={author} onChange={onAuthorChange} />
        </label>
      </div>

      <div>
        <label>
          url:
          <input type="text" value={url} onChange={onUrlChange} />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default BlogForm
