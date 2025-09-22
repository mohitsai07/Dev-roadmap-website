export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  videoId: string;
  videoTitle: string;
  completed: boolean;
  level: number;
  prerequisites: string[];
  children: string[];
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'documentation' | 'tutorial';
}

export interface MindMapNode {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description: string;
    completed: boolean;
    category: string;
  };
  type: 'default' | 'input' | 'output';
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  type: 'default' | 'smoothstep';
}

export interface UserProgress {
  completedNodes: string[];
  currentLevel: number;
  totalProgress: number;
  badges: Badge[];
  customRoadmaps: CustomRoadmap[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'completion' | 'streak' | 'milestone' | 'custom';
}

export interface CustomRoadmap {
  id: string;
  name: string;
  description: string;
  nodes: RoadmapNode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  nodeId?: string;
}
