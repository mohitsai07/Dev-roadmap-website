'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, Bug } from 'lucide-react';
import { AIChatMessage } from '@/types';
import { generateGeminiResponse, generateLearningExplanation, generateResourceSuggestions, generateTroubleshootingHelp } from '@/lib/gemini';
import { testGeminiAPI } from '@/lib/testGemini';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNodeId?: string;
  nodeTitle?: string;
}

export default function AIChat({ isOpen, onClose, selectedNodeId, nodeTitle }: AIChatProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI learning assistant. I can help explain concepts, provide additional resources, and answer questions about your learning journey. What would you like to know?`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingAPI, setIsTestingAPI] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      nodeId: selectedNodeId,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponse: string;
      const input = currentInput.toLowerCase();
      
      // Try to get AI response with fallback
      try {
        if (input.includes('explain') && nodeTitle) {
          aiResponse = await generateLearningExplanation(nodeTitle);
        } else if (input.includes('resources') || input.includes('help')) {
          aiResponse = await generateResourceSuggestions(nodeTitle || 'programming');
        } else if (input.includes('problem') || input.includes('error') || input.includes('stuck')) {
          aiResponse = await generateTroubleshootingHelp(nodeTitle || 'programming', currentInput);
        } else {
          aiResponse = await generateGeminiResponse(currentInput, nodeTitle);
        }
      } catch (apiError) {
        console.warn('API call failed, using fallback response:', apiError);
        // The generateGeminiResponse function now includes fallback responses
        // so we should get a response even if the API fails
        aiResponse = await generateGeminiResponse(currentInput, nodeTitle);
      }

      const aiMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        nodeId: selectedNodeId,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Unexpected error in AI chat:', error);
      const errorMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm here to help! While I'm having some technical difficulties, here are some general tips:\n\n• Check the official documentation for detailed explanations\n• Look for tutorials and examples online\n• Practice with hands-on exercises\n• Join community discussions for real-world insights\n\nFeel free to ask me anything about ${nodeTitle || 'programming'} - I'll do my best to help!`,
        timestamp: new Date(),
        nodeId: selectedNodeId,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTestAPI = async () => {
    setIsTestingAPI(true);
    try {
      const result = await testGeminiAPI();
      const testMessage: AIChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🔧 **API Test Result:**\n\n${result.success ? '✅' : '❌'} ${result.message}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, testMessage]);
    } catch (error) {
      const errorMessage: AIChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🔧 **API Test Failed:**\n\n❌ Error: ${typeof error === 'object' && error !== null && error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTestingAPI(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-black/90 backdrop-blur-md border-l border-white/10 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            {nodeTitle && (
              <span className="text-sm text-gray-400">- {nodeTitle}</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTestAPI}
            disabled={isTestingAPI}
            className="p-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Test API Connection"
          >
            <Bug className="h-4 w-4" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-100'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <Bot className="h-4 w-4 mt-1 text-blue-400 flex-shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <User className="h-4 w-4 mt-1 text-white flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 text-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-blue-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your learning..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          <Sparkles className="h-3 w-3 inline mr-1" />
          Try: "Explain this topic simply" or "Give me extra resources"
        </div>
      </div>
    </motion.div>
  );
}
