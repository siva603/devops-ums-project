import { User } from '../types';
import { Eye, Edit2, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-soft p-6 transition-all hover:shadow-xl group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/view-user/${user.id}`}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </Link>
          <Link
            to={`/edit-user/${user.id}`}
            className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
            title="Edit User"
          >
            <Edit2 size={16} />
          </Link>
          <button
            onClick={() => user.id && onDelete(user.id)}
            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            title="Delete User"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {user.firstName} {user.lastName}
      </h3>
      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-4">
        {user.department}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-gray-400" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400" />
          <span>{user.phone}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
        <Link
          to={`/view-user/${user.id}`}
          className="text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition-colors"
        >
          View Profile
        </Link>
        <span className="text-xs text-gray-400 font-mono">ID: #{user.id}</span>
      </div>
    </motion.div>
  );
}
