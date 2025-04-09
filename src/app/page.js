"use client";
import { useState } from "react";
import Link from "next/link";

const genres = ["Fiction", "Non-Fiction", "Fantasy", "Science", "Mystery"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );
      const data = await res.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleGenreClick = (genre) => {
    setQuery(genre);
    handleSearch(genre);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      handleSearch(query);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Discover Books</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Search for books and get great recommendations!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex">
        <input
          type="text"
          placeholder="Enter book title, author, or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="px-6 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Genre Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {book.volumeInfo.title}
                </h3>
                {book.volumeInfo.authors && (
                  <p className="text-gray-600 dark:text-gray-400">
                    By {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
