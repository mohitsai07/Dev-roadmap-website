'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { Moon, Sun, Menu, X, Brain, Trophy, Share2, Download, User, LogOut } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onToggleView: () => void;
  currentView: 'roadmap' | 'mindmap';
  progress: number;
  onExport: () => void;
  onShare: () => void;
}

export default function Header({ onToggleView, currentView, progress, onExport, onShare }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RoadmapAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleView}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
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
              onClick={onToggleView}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'mindmap'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Mind Map View
            </motion.button>

            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-gray-300">{progress}%</span>
            </div>

            {/* Authentication Section */}
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-blue-400" />
                    )}
                    <span className="text-white font-medium">{user?.name}</span>
                  </motion.button>
                  
                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                      </div>
                      <div className="p-1 space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onShare}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Share Progress"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExport}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Export PDF"
              >
                <Download className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onToggleView();
                  setIsMenuOpen(false);
                }}
                className="text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                Switch to {currentView === 'roadmap' ? 'Mind Map' : 'Roadmap'} View
              </button>
              
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-gray-300">Progress: {progress}%</span>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Mobile Authentication */}
              {isAuthenticated ? (
                <div className="px-4 py-2 border-t border-white/10">
                  <div className="flex items-center space-x-3 mb-3">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="h-6 w-6 text-blue-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 border-t border-white/10">
                  <div className="flex space-x-2">
                    <Link
                      href="/login"
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-around px-4 py-2">
                <button
                  onClick={() => {
                    onShare();
                    setIsMenuOpen(false);
                  }}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => {
                    onExport();
                    setIsMenuOpen(false);
                  }}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Download className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
