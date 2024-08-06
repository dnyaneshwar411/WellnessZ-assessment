import AddBook from "@/components/AddBook";
import BooksListing from "@/components/BooksListing";
import { fetchData } from "@/utils/server";

export default async function Home() {
  const response = await fetchData("catalogue/list");
  if (!response.success) return <div>
    Data Not available right now
  </div>
  return (
    <main>
      <BooksListing lists={response.payload} />
      <AddBook />
    </main>
  );
}