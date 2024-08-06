import Image from "next/image";

export default function BooksListing({ lists = [] }) {
  if (lists.length === 0) return <p>No books available.</p>;

  return (
    <div className="px-4 lg:px-8">
      <h1>List of Books</h1>
      <div className="flex items-start gap-4 flex-wrap mt-8">
        {lists.map((list) => (
          <div key={list._id} className="bg-white book-card rounded-md overflow-clip">
            <Image
              src={list.cover_image.url}
              alt={list.title}
              height={720}
              width={720}
              className="object-cover w-full aspect-video"
            />
            <div className="p-4">
              <h1 className="">{list.title}</h1>
              <p className="text-[#808080]">{list.description}</p>
              <div>{list.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}