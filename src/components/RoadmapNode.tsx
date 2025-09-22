'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Check, X, ExternalLink, Map, Clock, Star } from 'lucide-react';
import { RoadmapNode as RoadmapNodeType } from '@/types';
import { getDifficultyColor, getCategoryColor } from '@/lib/utils';

interface RoadmapNodeProps {
  node: RoadmapNodeType;
  isCompleted: boolean;
  onToggleComplete: (nodeId: string) => void;
  onOpenMindMap: (nodeId: string) => void;
}

export default function RoadmapNode({ 
  node, 
  isCompleted, 
  onToggleComplete, 
  onOpenMindMap 
}: RoadmapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`relative group cursor-pointer ${
        isCompleted ? 'opacity-75' : ''
      }`}
    >
      {/* Main Node Card */}
      <motion.div
        layout
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isCompleted
            ? 'bg-green-500/10 border-green-400/30 shadow-green-500/20'
            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
        } ${isExpanded ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-white">{node.title}</h3>
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400"
                  >
                    <Check className="h-6 w-6" />
                  </motion.div>
                )}
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                {node.description}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(node.difficulty)}`}>
                {node.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(node.category)}`}>
                {node.category}
              </span>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{node.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>Level {node.level}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(node.id);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isCompleted
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-400/30'
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/30'
              }`}
            >
              {isCompleted ? (
                <>
                  <X className="h-4 w-4 mr-2 inline" />
                  Mark Incomplete
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2 inline" />
                  Mark Complete
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onOpenMindMap(node.id);
              }}
              className="px-4 py-2 rounded-lg font-medium bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-400/30 transition-all duration-200"
            >
              <Map className="h-4 w-4 mr-2 inline" />
              Mind Map
            </motion.button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10"
            >
              <div className="p-6">
                {/* Video Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Learning Video</h4>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    {isVideoPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${node.videoId}?autoplay=1&rel=0`}
                        title={node.videoTitle}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center cursor-pointer group"
                        onClick={handleVideoClick}
                      >
                        <div className="text-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto"
                          >
                            <Play className="h-8 w-8 text-white ml-1" />
                          </motion.div>
                          <p className="text-white font-medium">{node.videoTitle}</p>
                          <p className="text-gray-400 text-sm">Click to play</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resources Section */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Additional Resources</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {node.resources.map((resource) => (
                      <motion.a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                      >
                        <ExternalLink className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{resource.title}</p>
                          <p className="text-gray-400 text-sm capitalize">{resource.type}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
