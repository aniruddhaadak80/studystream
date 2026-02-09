# 📚 StudyStream - AI-Powered Learning Assistant

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Algolia-Agent_Studio-5468ff?style=for-the-badge&logo=algolia" alt="Algolia" />
</p>

> **Master programming with AI-powered proactive learning!** StudyStream is a non-conversational AI assistant that proactively suggests what to learn next based on your progress and context.

## ✨ Features

### 🧠 Proactive AI Learning
- **Context-Aware Suggestions** - AI recommends topics based on what you're studying
- **Smart Quiz Selection** - Questions matched to your current skill level
- **Adaptive Difficulty** - Content adjusts to your performance

### 🎮 Gamification
- **Progress Tracking** - Track completion across all topics
- **Achievement Badges** - Unlock badges for milestones
- **Streak Counter** - Build daily learning habits
- **XP System** - Earn points for completing quizzes

### 📖 Rich Content
- **10 Study Topics** across JavaScript, Python, React, TypeScript, CSS
- **30+ Practice Questions** with explanations
- **Code Examples** with syntax highlighting
- **Key Terms** for each section

### 🎨 Beautiful UI
- **Focus Mode Design** - Distraction-free learning environment
- **Dark Theme** - Easy on the eyes for long study sessions
- **Smooth Animations** - Engaging micro-interactions
- **Confetti Celebration** - Celebrate quiz success!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/studystream.git
cd studystream

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Algolia credentials to .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to see the app!

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
```

## 📁 Project Structure

```
studystream/
├── app/
│   ├── page.tsx        # Main study interface
│   ├── layout.tsx      # Root layout with fonts
│   └── globals.css     # Custom CSS styles
├── components/
│   ├── ContentViewer.tsx   # Study content display
│   ├── SuggestionPanel.tsx # Proactive suggestions
│   └── QuizCard.tsx        # Interactive quizzes
├── lib/
│   ├── algolia.ts      # Algolia client config
│   └── study-data.ts   # Topics and questions
├── public/
└── package.json
```

## 📚 Study Topics

| Subject | Topics | Questions |
|---------|--------|-----------|
| JavaScript | Arrays, Async/Await, Objects | 7 |
| Python | Functions, OOP, Data Structures | 6 |
| React | Hooks, State Management | 5 |
| TypeScript | Basic Types, Interfaces, Generics | 4 |
| CSS | Grid, Flexbox, Responsive | 3 |

## 🏆 Achievements

| Badge | Name | Requirement |
|-------|------|-------------|
| 🚀 | First Steps | Complete 1 topic |
| ⚡ | Quick Learner | 10 correct answers |
| 🔥 | Streak Master | 3 day streak |
| 🏆 | Quiz Champion | 25 correct answers |

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Search**: Algolia Agent Studio

## 📸 Screenshots

### Dashboard
![Study Dashboard](#)

### Topic View
![Topic Learning](#)

### Quiz Mode
![Interactive Quiz](#)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Algolia](https://www.algolia.com/) for Agent Studio
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for beautiful icons

---

<p align="center">
  Made with ❤️ for the <a href="https://dev.to/challenges/algolia">Algolia Agent Studio Challenge</a>
</p>
