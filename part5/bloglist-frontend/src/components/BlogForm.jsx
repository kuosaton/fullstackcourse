const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  onTitleChange,
  onAuthorChange,
  onUrlChange,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        Title:
        <input value={title} onChange={onTitleChange} />
      </label>
    </div>

    <div>
      <label>
        Author:
        <input value={author} onChange={onAuthorChange} />
      </label>
    </div>

    <div>
      <label>
        Url:
        <input value={url} onChange={onUrlChange} />
      </label>
    </div>

    <button type="submit">Submit</button>
  </form>
)

export default BlogForm
