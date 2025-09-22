import { useLocalStorage } from './useLocalStorage';
import { UserProgress, Badge } from '@/types';
import { calculateProgress } from '@/lib/utils';

const initialProgress: UserProgress = {
  completedNodes: [],
  currentLevel: 1,
  totalProgress: 0,
  badges: [],
  customRoadmaps: []
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('roadmap-progress', initialProgress);

  const markNodeComplete = (nodeId: string) => {
    setProgress(prev => {
      if (prev.completedNodes.includes(nodeId)) {
        return prev;
      }
      
      const newCompletedNodes = [...prev.completedNodes, nodeId];
      const totalProgress = calculateProgress(newCompletedNodes, 10); // Assuming 10 total nodes
      
      // Check for badges
      const newBadges = [...prev.badges];
      
      if (newCompletedNodes.length === 1 && !prev.badges.find(b => b.id === 'first-step')) {
        newBadges.push({
          id: 'first-step',
          name: 'First Steps',
          description: 'Completed your first learning node!',
          icon: '🎯',
          earnedAt: new Date(),
          category: 'completion'
        });
      }
      
      if (newCompletedNodes.length === 5 && !prev.badges.find(b => b.id === 'halfway')) {
        newBadges.push({
          id: 'halfway',
          name: 'Halfway There',
          description: 'Completed 50% of the roadmap!',
          icon: '🏆',
          earnedAt: new Date(),
          category: 'milestone'
        });
      }
      
      if (newCompletedNodes.length === 10 && !prev.badges.find(b => b.id === 'completion')) {
        newBadges.push({
          id: 'completion',
          name: 'Roadmap Master',
          description: 'Completed the entire roadmap!',
          icon: '👑',
          earnedAt: new Date(),
          category: 'completion'
        });
      }
      
      return {
        ...prev,
        completedNodes: newCompletedNodes,
        totalProgress,
        badges: newBadges
      };
    });
  };

  const markNodeIncomplete = (nodeId: string) => {
    setProgress(prev => ({
      ...prev,
      completedNodes: prev.completedNodes.filter(id => id !== nodeId),
      totalProgress: calculateProgress(prev.completedNodes.filter(id => id !== nodeId), 10)
    }));
  };

  const isNodeComplete = (nodeId: string) => {
    return progress.completedNodes.includes(nodeId);
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return {
    progress,
    markNodeComplete,
    markNodeIncomplete,
    isNodeComplete,
    resetProgress
  };
}
