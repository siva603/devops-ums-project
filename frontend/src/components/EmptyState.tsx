import { UserX, SearchX } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  message?: string;
  isSearch?: boolean;
}

export default function EmptyState({ message = "No users found", isSearch = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white/40 backdrop-blur-sm border border-dashed border-gray-300 rounded-3xl">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
        {isSearch ? <SearchX size={40} /> : <UserX size={40} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500 text-center max-w-xs mb-8">
        {isSearch 
          ? "Try adjusting your search criteria to find what you're looking for." 
          : "Start by adding a new user to your management system."}
      </p>
      {!isSearch && (
        <Link
          to="/add-user"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all"
        >
          Add New User
        </Link>
      )}
    </div>
  );
}
