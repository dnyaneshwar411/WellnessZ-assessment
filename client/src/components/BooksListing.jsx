import Image from "next/image"

export default function BooksListing({ list }) {
  return <div className="px-4 lg:px-8">
    <h1>List of Books</h1>
    <div className="flex items-start gap-4 flex-wrap mt-8">
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
      {list.map(book => <Book
        key={book._id}
        book={book}
      />)}
    </div>
  </div>
};


function Book({ book }) {
  return <div className=" bg-white book-card rounded-md overflow-clip">
    <Image
      src={book.cover_image.url}
      alt="image"
      height={720}
      width={720}
      className="object-cover w-full aspect-video"
    />
    <div className="p-4">
      <h1 className="">{book.title}</h1>
      <p className="text-[#808080]">{book.description}</p>
      <div>{book.author}</div>
    </div>
  </div>
}