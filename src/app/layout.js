import Navbar from "../components/Navbar/Navbar.jsx"
import "./globals.css"; // Optional: Import global styles

export const metadata = {
  title: "My Next.js App",
  description: "Learning Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> 
        {children} 
      </body>
    </html>
  );
}