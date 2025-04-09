"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        // Fetch main book details from Google Books API
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await res.json();
        setBook(data);

        // Fetch reviews from MongoDB via our API route
        const reviewsRes = await fetch(`/api/reviews?bookId=${id}`);
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData.reviews);
        }

        // Fetch recommended books based on the first author
        const firstAuthor = data.volumeInfo?.authors?.[0];
        if (firstAuthor) {
          const recommendedRes = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
              firstAuthor
            )}&maxResults=6&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
          );
          if (recommendedRes.ok) {
            const recommendedData = await recommendedRes.json();
            setRecommendedBooks(recommendedData.items || []);
          }
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center py-8">No book details found.</div>;
  }

  const volumeInfo = book.volumeInfo || {};

  return (
    <div className="space-y-8">
      <button onClick={() => router.back()} className="text-blue-500 hover:underline">
        &larr; Back
      </button>
      {/* Book Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col md:flex-row">
        {volumeInfo.imageLinks?.thumbnail && (
          <img
            src={volumeInfo.imageLinks.thumbnail}
            alt={volumeInfo.title}
            className="w-full md:w-1/3 object-cover rounded"
          />
        )}
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{volumeInfo.title}</h2>
          {volumeInfo.authors && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              By {volumeInfo.authors.join(", ")}
            </p>
          )}
          <p className="mt-4 text-gray-700 dark:text-gray-200">
            {volumeInfo.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
              <p className="text-gray-800 dark:text-gray-200">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">Rating: {review.rating}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No reviews available.</p>
        )}
      </div>

      {/* Recommended Books Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Recommended Books</h3>
        {recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedBooks.map((recBook) => {
              const recInfo = recBook.volumeInfo || {};
              return (
                <div key={recBook.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                  {recInfo.imageLinks?.thumbnail && (
                    <img
                      src={recInfo.imageLinks.thumbnail}
                      alt={recInfo.title}
                      className="w-full h-60 object-cover mb-4"
                    />
                  )}
                  <h4 className="text-lg font-semibold">
                    {recInfo.title || "Untitled"}
                  </h4>
                  {recInfo.authors && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By {recInfo.authors.join(", ")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">No recommendations available.</p>
        )}
      </div>
    </div>
  );
}
