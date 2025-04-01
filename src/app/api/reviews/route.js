// src/app/api/reviews/route.js
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId");

  if (!bookId) {
    return new Response(
      JSON.stringify({ error: "Missing bookId parameter" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookDB"); // Replace with your database name
    const reviews = await db.collection("reviews").find({ bookId }).toArray();
    return new Response(JSON.stringify({ reviews }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to load reviews" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
