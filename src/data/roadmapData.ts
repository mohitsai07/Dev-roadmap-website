import { RoadmapNode } from '@/types';

export const webDevelopmentRoadmap: RoadmapNode[] = [
  {
    id: 'html',
    title: 'HTML Fundamentals',
    description: 'Learn the structure and semantics of HTML, the foundation of web development.',
    videoId: 'qz0aGYrrlhU',
    videoTitle: 'HTML Tutorial for Beginners',
    completed: false,
    level: 1,
    prerequisites: [],
    children: ['css', 'accessibility'],
    category: 'frontend',
    estimatedTime: '2-3 weeks',
    difficulty: 'beginner',
    resources: [
      {
        id: 'html-mdn',
        title: 'MDN HTML Documentation',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        type: 'documentation'
      },
      {
        id: 'html-w3schools',
        title: 'W3Schools HTML Tutorial',
        url: 'https://www.w3schools.com/html/',
        type: 'tutorial'
      }
    ]
  },
  {
    id: 'css',
    title: 'CSS Styling',
    description: 'Master CSS for beautiful, responsive web designs and layouts.',
    videoId: '1Rs2ND1ryYc',
    videoTitle: 'CSS Tutorial for Beginners',
    completed: false,
    level: 1,
    prerequisites: ['html'],
    children: ['javascript', 'responsive-design'],
    category: 'frontend',
    estimatedTime: '3-4 weeks',
    difficulty: 'beginner',
    resources: [
      {
        id: 'css-flexbox',
        title: 'CSS Flexbox Guide',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        type: 'article'
      },
      {
        id: 'css-grid',
        title: 'CSS Grid Layout',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        type: 'article'
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript Programming',
    description: 'Learn JavaScript, the programming language that powers the web.',
    videoId: 'PkZNo7MFNFg',
    videoTitle: 'JavaScript Tutorial for Beginners',
    completed: false,
    level: 2,
    prerequisites: ['html', 'css'],
    children: ['react', 'nodejs'],
    category: 'frontend',
    estimatedTime: '4-6 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'js-mdn',
        title: 'MDN JavaScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        type: 'documentation'
      },
      {
        id: 'js-es6',
        title: 'ES6 Features',
        url: 'https://es6-features.org/',
        type: 'documentation'
      }
    ]
  },
  {
    id: 'react',
    title: 'React Framework',
    description: 'Build dynamic user interfaces with React, the most popular frontend library.',
    videoId: 'w7ejDZ8SWv8',
    videoTitle: 'React Tutorial for Beginners',
    completed: false,
    level: 3,
    prerequisites: ['javascript'],
    children: ['nextjs', 'state-management'],
    category: 'frontend',
    estimatedTime: '4-5 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'react-docs',
        title: 'React Official Documentation',
        url: 'https://react.dev/',
        type: 'documentation'
      },
      {
        id: 'react-patterns',
        title: 'React Patterns',
        url: 'https://reactpatterns.com/',
        type: 'article'
      }
    ]
  },
  {
    id: 'nodejs',
    title: 'Node.js Backend',
    description: 'Build server-side applications with Node.js and JavaScript.',
    videoId: 'fBNz5xF-Kx4',
    videoTitle: 'Node.js Tutorial for Beginners',
    completed: false,
    level: 3,
    prerequisites: ['javascript'],
    children: ['express', 'database'],
    category: 'backend',
    estimatedTime: '3-4 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'nodejs-docs',
        title: 'Node.js Documentation',
        url: 'https://nodejs.org/en/docs/',
        type: 'documentation'
      },
      {
        id: 'nodejs-best-practices',
        title: 'Node.js Best Practices',
        url: 'https://github.com/goldbergyoni/nodebestpractices',
        type: 'article'
      }
    ]
  },
  {
    id: 'express',
    title: 'Express.js Framework',
    description: 'Create RESTful APIs and web applications with Express.js.',
    videoId: 'L72fhGm1tfE',
    videoTitle: 'Express.js Tutorial',
    completed: false,
    level: 4,
    prerequisites: ['nodejs'],
    children: ['authentication', 'api-design'],
    category: 'backend',
    estimatedTime: '2-3 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'express-docs',
        title: 'Express.js Documentation',
        url: 'https://expressjs.com/',
        type: 'documentation'
      },
      {
        id: 'express-middleware',
        title: 'Express Middleware Guide',
        url: 'https://expressjs.com/en/guide/using-middleware.html',
        type: 'documentation'
      }
    ]
  },
  {
    id: 'database',
    title: 'Database Design',
    description: 'Learn database fundamentals, SQL, and data modeling.',
    videoId: 'HXV3zeQKqGY',
    videoTitle: 'SQL Tutorial for Beginners',
    completed: false,
    level: 4,
    prerequisites: ['nodejs'],
    children: ['mongodb', 'postgresql'],
    category: 'database',
    estimatedTime: '3-4 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'sql-tutorial',
        title: 'SQL Tutorial',
        url: 'https://www.w3schools.com/sql/',
        type: 'tutorial'
      },
      {
        id: 'database-design',
        title: 'Database Design Principles',
        url: 'https://www.lucidchart.com/pages/database-diagram/database-design',
        type: 'article'
      }
    ]
  },
  {
    id: 'nextjs',
    title: 'Next.js Framework',
    description: 'Build full-stack React applications with Next.js.',
    videoId: 'mTz0GXjfNN0',
    videoTitle: 'Next.js Tutorial for Beginners',
    completed: false,
    level: 4,
    prerequisites: ['react'],
    children: ['deployment', 'performance'],
    category: 'frontend',
    estimatedTime: '3-4 weeks',
    difficulty: 'intermediate',
    resources: [
      {
        id: 'nextjs-docs',
        title: 'Next.js Documentation',
        url: 'https://nextjs.org/docs',
        type: 'documentation'
      },
      {
        id: 'nextjs-patterns',
        title: 'Next.js Patterns',
        url: 'https://nextjs.org/docs/basic-features/pages',
        type: 'documentation'
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication & Security',
    description: 'Implement secure user authentication and authorization.',
    videoId: 'F-sFp_AvHc8',
    videoTitle: 'Authentication Tutorial',
    completed: false,
    level: 5,
    prerequisites: ['express'],
    children: ['jwt', 'oauth'],
    category: 'backend',
    estimatedTime: '2-3 weeks',
    difficulty: 'advanced',
    resources: [
      {
        id: 'auth-guide',
        title: 'Authentication Guide',
        url: 'https://auth0.com/learn/authentication-and-authorization/',
        type: 'article'
      },
      {
        id: 'jwt-guide',
        title: 'JWT Guide',
        url: 'https://jwt.io/introduction',
        type: 'documentation'
      }
    ]
  },
  {
    id: 'deployment',
    title: 'Deployment & DevOps',
    description: 'Deploy applications and set up CI/CD pipelines.',
    videoId: 'eB0nUzAI7M8',
    videoTitle: 'Deployment Tutorial',
    completed: false,
    level: 5,
    prerequisites: ['nextjs'],
    children: ['docker', 'aws'],
    category: 'devops',
    estimatedTime: '3-4 weeks',
    difficulty: 'advanced',
    resources: [
      {
        id: 'vercel-deploy',
        title: 'Vercel Deployment Guide',
        url: 'https://vercel.com/docs/deployments',
        type: 'documentation'
      },
      {
        id: 'docker-guide',
        title: 'Docker for Developers',
        url: 'https://docs.docker.com/get-started/',
        type: 'documentation'
      }
    ]
  }
];

export const mindMapData = {
  nodes: [
    { id: 'html', position: { x: 100, y: 100 }, data: { label: 'HTML', description: 'Structure', completed: false, category: 'frontend' } },
    { id: 'css', position: { x: 300, y: 100 }, data: { label: 'CSS', description: 'Styling', completed: false, category: 'frontend' } },
    { id: 'javascript', position: { x: 500, y: 100 }, data: { label: 'JavaScript', description: 'Logic', completed: false, category: 'frontend' } },
    { id: 'react', position: { x: 700, y: 100 }, data: { label: 'React', description: 'Framework', completed: false, category: 'frontend' } },
    { id: 'nodejs', position: { x: 500, y: 300 }, data: { label: 'Node.js', description: 'Backend', completed: false, category: 'backend' } },
    { id: 'express', position: { x: 700, y: 300 }, data: { label: 'Express', description: 'API', completed: false, category: 'backend' } },
    { id: 'database', position: { x: 300, y: 300 }, data: { label: 'Database', description: 'Data', completed: false, category: 'database' } },
    { id: 'nextjs', position: { x: 900, y: 100 }, data: { label: 'Next.js', description: 'Full-stack', completed: false, category: 'frontend' } },
    { id: 'deployment', position: { x: 900, y: 300 }, data: { label: 'Deployment', description: 'DevOps', completed: false, category: 'devops' } }
  ],
  edges: [
    { id: 'e1-2', source: 'html', target: 'css', type: 'smoothstep' },
    { id: 'e2-3', source: 'css', target: 'javascript', type: 'smoothstep' },
    { id: 'e3-4', source: 'javascript', target: 'react', type: 'smoothstep' },
    { id: 'e3-5', source: 'javascript', target: 'nodejs', type: 'smoothstep' },
    { id: 'e5-6', source: 'nodejs', target: 'express', type: 'smoothstep' },
    { id: 'e5-7', source: 'nodejs', target: 'database', type: 'smoothstep' },
    { id: 'e4-8', source: 'react', target: 'nextjs', type: 'smoothstep' },
    { id: 'e8-9', source: 'nextjs', target: 'deployment', type: 'smoothstep' }
  ]
};
