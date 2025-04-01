"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const { id } = useParams(); // Gets the dynamic segment from the URL
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no id is available yet, do nothing
    if (!id) return;

    // Fetch the book details from the Google Books API
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    // Fetch reviews from your API (MongoDB)
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?bookId=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await res.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    // Run both fetch functions and then disable the loading state
    Promise.all([fetchBook(), fetchReviews()]).then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  // If no book details were retrieved, show a message
  if (!book) {
    return <div className="text-center py-8">No book details found.</div>;
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => router.back()}
        className="text-blue-500 hover:underline"
      >
        &larr; Back
      </button>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
        {book.volumeInfo.imageLinks?.thumbnail && (
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
            className="w-full md:w-1/3 object-cover rounded"
          />
        )}
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{book.volumeInfo.title}</h2>
          {book.volumeInfo.authors && (
            <p className="text-lg text-gray-600 mt-2">
              By {book.volumeInfo.authors.join(", ")}
            </p>
          )}
          <p className="mt-4 text-gray-700">
            {book.volumeInfo.description || "No description available."}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Rating: {review.rating}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
}
