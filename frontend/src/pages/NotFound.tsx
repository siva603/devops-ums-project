import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-indigo-100">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search size={80} className="text-indigo-600 animate-bounce" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all"
      >
        <Home size={20} /> Back to Dashboard
      </Link>
    </div>
  );
}
