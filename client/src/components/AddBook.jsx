export default function AddBook() {
  return <div className="px-4 my-10">
    <h1>Add A Book</h1>
    <form className="mt-4">
      <input className="mb-4" type="text" name="title" placeholder="title" />
      <input className="mb-4" type="text" name="description" placeholder="description" />
      <input className="mb-4" type="text" name="author" placeholder="author" />
      <input className="mb-4" type="text" name="preview image" placeholder="preview image" />
      <input hidden type="text" name="title" placeholder="title" />
      <button>submit</button>
    </form>
  </div>
};
