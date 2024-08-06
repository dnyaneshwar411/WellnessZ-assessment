import AddBook from "@/components/AddBook";
import BooksListing from "@/components/BooksListing";
import { fetchData } from "@/utils/server";

export default async function Home() {
  const response = await fetchData("catalogue/list")

  return (
    <main>
      <BooksListing list={response.payload} />
      <AddBook />
    </main>
  );
}