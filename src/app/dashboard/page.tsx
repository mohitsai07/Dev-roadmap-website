'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { User, Calendar, Trophy, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400">Here's your learning dashboard</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Completed Courses', value: '12', icon: Trophy, color: 'text-yellow-400' },
              { title: 'Learning Streak', value: '7 days', icon: Calendar, color: 'text-green-400' },
              { title: 'Total Progress', value: '68%', icon: User, color: 'text-blue-400' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Learning Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Frontend Development</h3>
                  <p className="text-gray-400 text-sm">HTML, CSS, JavaScript, React</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">85%</p>
                  <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Backend Development</h3>
                  <p className="text-gray-400 text-sm">Node.js, Express, Database</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-medium">45%</p>
                  <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">DevOps & Deployment</h3>
                  <p className="text-gray-400 text-sm">Docker, AWS, CI/CD</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-medium">20%</p>
                  <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-4">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                <p className="text-gray-400">{user?.email}</p>
                <p className="text-gray-500 text-sm">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
