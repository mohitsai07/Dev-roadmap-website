# RoadmapAI - Futuristic Learning Roadmap

A modern, interactive learning roadmap application with AI integration, mind maps, and gamification features.

## 🚀 Features

### Core Features
- **Interactive Roadmap UI**: Expandable nodes representing learning topics
- **Mind Map Visualization**: Switch between roadmap and mind map views
- **Progress Tracking**: Mark nodes as completed and track overall progress
- **AI Chat Assistant**: Get explanations and resources for any topic
- **Gamification**: Earn badges and track milestones
- **Export & Share**: Export roadmaps as PDF and share progress

### UI/UX Features
- **Futuristic Design**: Glassmorphism and neumorphism effects
- **Dark Mode**: Default dark theme with toggle option
- **Smooth Animations**: Framer Motion powered animations
- **Mobile Responsive**: Optimized for all device sizes
- **Modern Navigation**: Clean, minimal interface

### Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **React Flow**: Interactive mind maps
- **Local Storage**: Persistent progress tracking
- **PDF Export**: Built-in export functionality

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Mind Maps**: React Flow
- **State Management**: Zustand, Local Storage
- **Icons**: Lucide React
- **PDF Export**: jsPDF, html2canvas

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd roadmap-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AIChat.tsx        # AI chat assistant
│   ├── Header.tsx        # Navigation header
│   ├── MindMapViewer.tsx # Mind map component
│   ├── ProgressTracker.tsx # Progress tracking
│   ├── RoadmapNode.tsx   # Individual roadmap nodes
│   └── ThemeProvider.tsx # Theme context
├── data/                 # Sample data
│   └── roadmapData.ts    # Roadmap and mind map data
├── hooks/                # Custom hooks
│   ├── useLocalStorage.ts # Local storage hook
│   └── useProgress.ts    # Progress management
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
└── types/                # TypeScript types
    └── index.ts          # Type definitions
```

## 🎯 Usage

### Roadmap View
- Browse learning topics in an organized grid layout
- Click on nodes to expand and view details
- Watch embedded YouTube videos for each topic
- Mark topics as completed to track progress
- Access additional resources and documentation

### Mind Map View
- Visualize learning paths and connections
- Interactive node-based interface
- Click nodes to open AI chat for that topic
- See completion status with visual indicators

### AI Assistant
- Ask questions about any learning topic
- Get simplified explanations
- Request additional resources
- Context-aware responses based on selected topics

### Progress Tracking
- View overall completion percentage
- Earn badges for milestones
- Track learning streaks
- Export progress as PDF

## 🎨 Customization

### Adding New Topics
Edit `src/data/roadmapData.ts` to add new learning nodes:

```typescript
{
  id: 'new-topic',
  title: 'New Topic',
  description: 'Description of the topic',
  videoId: 'youtube-video-id',
  videoTitle: 'Video Title',
  completed: false,
  level: 1,
  prerequisites: ['prerequisite-id'],
  children: ['child-topic-id'],
  category: 'frontend',
  estimatedTime: '2-3 weeks',
  difficulty: 'beginner',
  resources: [...]
}
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Component-specific styles are in individual component files

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [roadmap.sh](https://roadmap.sh) for inspiration
- [React Flow](https://reactflow.dev) for mind map functionality
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide](https://lucide.dev) for icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React, and modern web technologies.