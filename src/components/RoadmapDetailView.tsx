'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Check, X, ExternalLink, Map, Clock, Star, Brain, MessageCircle } from 'lucide-react';
import { Course } from '@/data/coursesData';
import { useProgress } from '@/hooks/useProgress';
import { getDifficultyColor, getCategoryColor } from '@/lib/utils';
import MindMapViewer from './MindMapViewer';
import AIChat from './AIChat';

interface RoadmapDetailViewProps {
  course: Course;
  onBack: () => void;
}

export default function RoadmapDetailView({ course, onBack }: RoadmapDetailViewProps) {
  const [currentView, setCurrentView] = useState<'roadmap' | 'mindmap'>('roadmap');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [selectedNodeTitle, setSelectedNodeTitle] = useState<string | undefined>();
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  
  const { progress, markNodeComplete, markNodeIncomplete, isNodeComplete } = useProgress();

  const handleNodeToggle = (nodeId: string) => {
    if (isNodeComplete(nodeId)) {
      markNodeIncomplete(nodeId);
    } else {
      markNodeComplete(nodeId);
    }
  };

  const handleOpenMindMap = (nodeId: string) => {
    setCurrentView('mindmap');
  };

  const handleNodeClick = (nodeId: string) => {
    const node = course.roadmap.find(n => n.id === nodeId);
    if (node) {
      setSelectedNodeId(nodeId);
      setSelectedNodeTitle(node.title);
      setIsAIChatOpen(true);
    }
  };

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  const completedCount = course.roadmap.filter(node => isNodeComplete(node.id)).length;
  const totalCount = course.roadmap.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Roadmaps</span>
              </motion.button>

              {/* Course Title */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{course.icon}</div>
                <div>
                  <h1 className="text-xl font-bold text-white">{course.title}</h1>
                  <p className="text-sm text-gray-400">Step by step guide to becoming a modern {course.title.toLowerCase()}</p>
                </div>
              </div>

              {/* AI Assistant Button */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAIChatOpen(true)}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-all duration-200 flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>AI Assistant</span>
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Progress</span>
                <span className="text-sm text-white font-semibold">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{completedCount} completed</span>
                <span>{totalCount - completedCount} remaining</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white/5 rounded-lg p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('roadmap')}
                className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'roadmap'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Roadmap View
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentView('mindmap')}
                className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'mindmap'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Mind Map View
              </motion.button>
            </div>
          </div>

          {currentView === 'roadmap' ? (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Course Description */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">{course.title} Roadmap</h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto">{course.description}</p>
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span className="capitalize">{course.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Roadmap Nodes */}
              <div className="space-y-4">
                {course.roadmap.map((node, index) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group ${
                      isNodeComplete(node.id) ? 'opacity-75' : ''
                    }`}
                  >
                    <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isNodeComplete(node.id)
                        ? 'bg-green-500/10 border-green-400/30 shadow-green-500/20'
                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    } ${expandedNode === node.id ? 'shadow-2xl shadow-blue-500/20' : 'shadow-lg'}`}>
                      
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                      
                      {/* Content */}
                      <div className="relative p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">
                                {index + 1}
                              </div>
                              <h3 className="text-xl font-bold text-white">{node.title}</h3>
                              {isNodeComplete(node.id) && (
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
                            onClick={() => handleNodeToggle(node.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                              isNodeComplete(node.id)
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-400/30'
                                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-400/30'
                            }`}
                          >
                            {isNodeComplete(node.id) ? (
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
                            onClick={() => handleOpenMindMap(node.id)}
                            className="px-4 py-2 rounded-lg font-medium bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-400/30 transition-all duration-200"
                          >
                            <Map className="h-4 w-4 mr-2 inline" />
                            Mind Map
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleNodeExpansion(node.id)}
                            className="px-4 py-2 rounded-lg font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-400/30 transition-all duration-200"
                          >
                            <ExternalLink className="h-4 w-4 mr-2 inline" />
                            {expandedNode === node.id ? 'Hide Details' : 'Show Details'}
                          </motion.button>
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {expandedNode === node.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-white/10 mt-6 pt-6"
                            >
                              {/* Video Section */}
                              <div className="mb-6">
                                <h4 className="text-lg font-semibold text-white mb-3">Learning Video</h4>
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${node.videoId}?rel=0`}
                                    title={node.videoTitle}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  />
                                </div>
                              </div>

                              {/* Links & Resources Section (always visible) */}
                              <div className="mt-8">
                                <h4 className="text-lg font-semibold text-white mb-3">Links & Resources</h4>
                                {node.resources.length > 0 ? (
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
                                ) : (
                                  <p className="text-gray-400 italic">No additional links or resources available yet.</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="mindmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[600px] rounded-2xl overflow-hidden border border-white/10"
            >
              <MindMapViewer
                nodes={course.roadmap}
                completedNodes={progress.completedNodes}
                onNodeClick={handleNodeClick}
              />
            </motion.div>
          )}
        </main>

        {/* AI Chat */}
        <AIChat
          isOpen={isAIChatOpen}
          onClose={() => setIsAIChatOpen(false)}
          selectedNodeId={selectedNodeId}
          nodeTitle={selectedNodeTitle}
        />
      </div>
    </div>
  );
}
