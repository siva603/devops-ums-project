import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User } from '../types';
import { Users, UserPlus, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Loader from '../components/Loader';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    departments: 0,
    recent: [] as User[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await userService.getAllUsers();
        const depts = new Set(users.map((u) => u.department)).size;
        setStats({
          total: users.length,
          departments: depts,
          recent: users.slice(-4).reverse(),
        });
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const statCards = [
    { title: 'Total Users', value: stats.total, icon: Users, color: 'bg-blue-500' },
    { title: 'Departments', value: stats.departments, icon: Building2, color: 'bg-purple-500' },
    { title: 'Active Now', value: Math.floor(stats.total * 0.7), icon: TrendingUp, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Welcome Back!</h1>
          <p className="text-indigo-100 max-w-md">
            Manage your organization's users efficiently with our modern dashboard.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/users"
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              View Users <ArrowRight size={18} />
            </Link>
            <Link
              to="/add-user"
              className="bg-indigo-500/30 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500/40 transition-all flex items-center gap-2"
            >
              <UserPlus size={18} /> Add New
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute right-10 bottom-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-soft flex items-center gap-5"
          >
            <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <card.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-soft">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recently Added</h2>
            <Link to="/users" className="text-indigo-600 text-sm font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {stats.recent.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {user.firstName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.department}</p>
                  </div>
                </div>
                <Link to={`/view-user/${user.id}`} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                  <ArrowRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-soft flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
            <TrendingUp size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">System Insights</h2>
          <p className="text-gray-500 max-w-xs mb-6">
            Your user base has grown by 12% this month. Keep up the great work managing your team!
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all">
            Generate Report
          </button>
        </section>
      </div>
    </div>
  );
}
