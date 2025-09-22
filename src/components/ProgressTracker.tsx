'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Crown, Star, CheckCircle } from 'lucide-react';
import { UserProgress } from '@/types';

interface ProgressTrackerProps {
  progress: UserProgress;
  onReset: () => void;
}

export default function ProgressTracker({ progress, onReset }: ProgressTrackerProps) {
  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'completion':
        return <CheckCircle className="h-5 w-5" />;
      case 'milestone':
        return <Trophy className="h-5 w-5" />;
      case 'streak':
        return <Zap className="h-5 w-5" />;
      case 'custom':
        return <Star className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'completion':
        return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'milestone':
        return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'streak':
        return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'custom':
        return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      default:
        return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Crown className="h-6 w-6 mr-2 text-yellow-400" />
          Your Progress
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
        >
          Reset Progress
        </motion.button>
      </div>

      {/* Progress Overview */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300">Overall Progress</span>
          <span className="text-white font-semibold">{progress.totalProgress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress.totalProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-1">
          <span>{progress.completedNodes.length} completed</span>
          <span>Level {progress.currentLevel}</span>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
          Badges ({progress.badges.length})
        </h4>
        
        {progress.badges.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400">No badges earned yet</p>
            <p className="text-gray-500 text-sm">Complete nodes to earn your first badge!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {progress.badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-lg border ${getBadgeColor(badge.category)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getBadgeIcon(badge.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-sm truncate">{badge.name}</h5>
                    <p className="text-xs opacity-80 mt-1">{badge.description}</p>
                    <p className="text-xs opacity-60 mt-1">
                      Earned {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{progress.completedNodes.length}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{progress.badges.length}</div>
            <div className="text-sm text-gray-400">Badges</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
