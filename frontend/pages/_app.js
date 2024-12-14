import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">Travel Booking App</a>
          <div>
            <a href="/" className="mr-4 hover:underline">Packages</a>
            <a href="/admin" className="hover:underline">Admin</a>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
      <footer className="bg-blue-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          © 2024 Travel Booking App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MyApp;