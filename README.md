# Book Recommendation System

This is a full-stack web application that helps users discover books through a dynamic search powered by the Google Books API, displays detailed book information with user reviews stored in MongoDB, and shows personalized book recommendations. The app features a responsive design with dark mode, a home icon for quick navigation, and genre filtering.

## Features

- **Book Search:** Users can search for books by entering keywords, titles, or authors.
- **Book Details:** Clicking on a book displays detailed information including cover image, title, authors, and a formatted description.
- **User Reviews:** Reviews for each book are stored in MongoDB and displayed on the book detail page.
- **Recommended Books:** The app recommends additional books based on the first author of the currently viewed book.
- **UI Enhancements:** The app features a modern responsive design using Tailwind CSS, a dark mode toggle, a home icon in the header, and genre buttons for quick filtering.

## Technologies Used

- **Next.js (App Router):** For building a dynamic, full-stack web application with server-side rendering.
- **Tailwind CSS:** For fast, responsive, and efficient styling.
- **MongoDB Atlas:** As the NoSQL database to store user reviews.
- **Google Books API:** For fetching real-time book data.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above recommended)
- npm (included with Node.js)
- A MongoDB Atlas account (or a local MongoDB setup)
- A Google Books API key (obtainable from [Google Cloud Console](https://console.cloud.google.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd my-book-recommender

