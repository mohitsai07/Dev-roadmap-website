'use client';

import { motion } from 'framer-motion';
import { Clock, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseCardProps {
  course: Course;
  onClick: (courseId: string) => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400 bg-green-400/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'role-based':
        return 'text-blue-400 bg-blue-400/20';
      case 'skill-based':
        return 'text-purple-400 bg-purple-400/20';
      case 'project-ideas':
        return 'text-green-400 bg-green-400/20';
      case 'best-practices':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(course.id)}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm hover:border-blue-300 dark:hover:border-white/20 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-md">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{course.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                    {course.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {course.isNew && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-400/30"
                >
                  New
                </motion.span>
              )}
              {course.isPopular && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full border border-yellow-400/30"
                >
                  <Star className="h-3 w-3 inline mr-1" />
                  Popular
                </motion.span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {course.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.estimatedTime}</span>
              </div>
            </div>
            
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
            >
              <span className="text-sm font-medium mr-1">Start Learning</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
      </div>
    </motion.div>
  );
}
