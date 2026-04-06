import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { User } from '../types';
import { ArrowLeft, Edit2, Trash2, Mail, Phone, Building2, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import Loader from '../components/Loader';
import { motion } from 'motion/react';

export default function ViewUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const data = await userService.getUserById(parseInt(id));
        setUser(data);
      } catch (error) {
        console.error('Error fetching user', error);
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(parseInt(id));
        navigate('/users');
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  };

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/users" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Directory</span>
        </Link>
        <div className="flex gap-3">
          <Link
            to={`/edit-user/${user.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors font-semibold"
          >
            <Edit2 size={18} /> Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-semibold"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl mb-6">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
            <p className="text-indigo-600 font-medium mb-4">{user.department}</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck size={12} /> Active
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                ID: #{user.id}
              </span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-soft">
            <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Tasks Completed</span>
                <span className="font-bold text-gray-900">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Performance</span>
                <span className="font-bold text-emerald-600">98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Attendance</span>
                <span className="font-bold text-gray-900">100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={12} /> Email Address
                </p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Phone size={12} /> Phone Number
                </p>
                <p className="text-gray-900 font-medium">{user.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Building2 size={12} /> Department
                </p>
                <p className="text-gray-900 font-medium">{user.department}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={12} /> Office Location
                </p>
                <p className="text-gray-900 font-medium">Main Headquarters, Floor 4</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Employment Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Joined Date</p>
                  <p className="text-gray-500">January 15, 2024 (2 years ago)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Role & Permissions</p>
                  <p className="text-gray-500">Standard User with Departmental Access</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
