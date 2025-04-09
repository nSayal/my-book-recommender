import Link from "next/link";
import "../styles/globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
  title: "Book Recommendation System",
  description: "Discover and explore books with reviews and recommendations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Home Icon with Text */}
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6"
                  />
                </svg>
                <span className="ml-2 font-bold text-xl">Home</span>
              </div>
            </Link>
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-white dark:bg-gray-800 mt-8 py-4 shadow">
          <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Book Recommendation System
          </div>
        </footer>
      </body>
    </html>
  );
}
