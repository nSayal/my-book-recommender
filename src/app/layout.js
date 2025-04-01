// src/app/layout.js
// src/app/layout.js
import "./globals.css"; // since both files are in the same folder (app)


export const metadata = {
  title: "Book Recommendation System",
  description: "Discover and explore books with reviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Book Recommendation System</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-white mt-8 py-4 shadow">
          <div className="container mx-auto text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Book Recommendation System
          </div>
        </footer>
      </body>
    </html>
  );
}
