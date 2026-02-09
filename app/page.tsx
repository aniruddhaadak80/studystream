'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Zap,
  Target,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Trophy,
  Flame,
  Star,
  CheckCircle2,
  XCircle,
  Sparkles,
  GraduationCap,
  Code,
  Play,
  RotateCcw,
  Award
} from 'lucide-react';
import { studyTopics, getTopicsBySubject, getAllSubjects, StudyTopic, PracticeQuestion } from '@/lib/study-data';

// Confetti Effect Component
function Confetti() {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    rotation: number;
    color: string;
    size: number;
    velocity: { x: number; y: number };
  }>>([]);

  useEffect(() => {
    const colors = ['#667eea', '#764ba2', '#43e97b', '#38f9d7', '#f093fb', '#f8b739'];
    const newParticles = Array.from({ length: 50 }).map(() => ({
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      velocity: {
        x: (Math.random() - 0.5) * 20,
        y: -10 - Math.random() * 10,
      },
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: `${particle.x + particle.velocity.x}%`,
            y: `${particle.y + particle.velocity.y + 100}%`,
            rotate: particle.rotation,
            opacity: 0,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

// Topic Card Component
function TopicCard({
  topic,
  progress,
  onSelect
}: {
  topic: StudyTopic;
  progress: number;
  onSelect: () => void;
}) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#43e97b';
      case 'intermediate': return '#f8b739';
      case 'advanced': return '#fa709a';
      default: return '#667eea';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="cursor-pointer p-6 rounded-2xl transition-all group"
      style={{
        background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9), rgba(20, 20, 35, 0.95))',
        border: `1px solid ${topic.color}30`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="text-4xl p-3 rounded-xl"
          style={{ background: `${topic.color}20` }}
        >
          {topic.icon}
        </div>
        <div className="text-right">
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${getDifficultyColor(topic.difficulty)}20`,
              color: getDifficultyColor(topic.difficulty),
            }}
          >
            {topic.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#667eea] transition-colors">
        {topic.title}
      </h3>
      <p className="text-sm text-white/60 line-clamp-2 mb-4">
        {topic.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{topic.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen size={12} />
          <span>{topic.sections.length} sections</span>
        </div>
        <div className="flex items-center gap-1">
          <Target size={12} />
          <span>{topic.practiceQuestions.length} questions</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${topic.color}, ${topic.color}80)` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-white/40">
          <span>{progress}% complete</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

// Quiz Component
function QuizComponent({
  question,
  onAnswer,
  showResult
}: {
  question: PracticeQuestion;
  onAnswer: (index: number) => void;
  showResult: { correct: boolean; selectedIndex: number } | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9), rgba(20, 20, 35, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-[#667eea]" size={20} />
        <span className="text-sm text-white/60">Practice Question</span>
        <span
          className="ml-auto px-2 py-1 rounded text-xs"
          style={{
            background: question.difficulty === 'beginner' ? '#43e97b20' :
              question.difficulty === 'intermediate' ? '#f8b73920' : '#fa709a20',
            color: question.difficulty === 'beginner' ? '#43e97b' :
              question.difficulty === 'intermediate' ? '#f8b739' : '#fa709a',
          }}
        >
          {question.difficulty}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-6">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = showResult?.selectedIndex === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrectness = showResult !== null;

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.01 } : undefined}
              whileTap={!showResult ? { scale: 0.99 } : undefined}
              onClick={() => !showResult && onAnswer(index)}
              disabled={showResult !== null}
              className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-3 ${showCorrectness && isCorrect
                  ? 'bg-green-500/20 border-green-500'
                  : showCorrectness && isSelected && !showResult.correct
                    ? 'bg-red-500/20 border-red-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              style={{ border: '1px solid' }}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${showCorrectness && isCorrect
                  ? 'bg-green-500 text-white'
                  : showCorrectness && isSelected
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/60'
                }`}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-white/90">{option}</span>
              {showCorrectness && isCorrect && <CheckCircle2 className="text-green-500" size={20} />}
              {showCorrectness && isSelected && !showResult.correct && <XCircle className="text-red-500" size={20} />}
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl ${showResult.correct ? 'bg-green-500/10 border-green-500/30' : 'bg-blue-500/10 border-blue-500/30'
            }`}
          style={{ border: '1px solid' }}
        >
          <div className="flex items-center gap-2 mb-2">
            {showResult.correct ? (
              <>
                <Sparkles className="text-green-500" size={18} />
                <span className="font-semibold text-green-500">Correct!</span>
              </>
            ) : (
              <>
                <BookOpen className="text-blue-400" size={18} />
                <span className="font-semibold text-blue-400">Explanation</span>
              </>
            )}
          </div>
          <p className="text-sm text-white/70">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Study Content Viewer
function ContentViewer({ topic, onQuizStart }: { topic: StudyTopic; onQuizStart: () => void }) {
  const [activeSection, setActiveSection] = useState(0);
  const section = topic.sections[activeSection];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {topic.sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeSection === i
                ? 'bg-[#667eea] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={section.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9), rgba(20, 20, 35, 0.95))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
        <p className="text-white/70 mb-6 leading-relaxed">{section.content}</p>

        {section.codeExample && (
          <div className="rounded-xl overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e]">
              <Code size={14} className="text-[#667eea]" />
              <span className="text-xs text-white/50">Code Example</span>
            </div>
            <pre className="p-4 bg-[#0d0d14] overflow-x-auto">
              <code className="text-sm text-white/90 font-mono">
                {section.codeExample}
              </code>
            </pre>
          </div>
        )}

        {/* Key Terms */}
        <div className="flex flex-wrap gap-2">
          {section.keyTerms.map((term, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs bg-[#667eea]/10 text-[#667eea] border border-[#667eea]/20"
            >
              {term}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
          disabled={activeSection === 0}
          className="px-6 py-3 rounded-xl bg-white/5 text-white/60 disabled:opacity-30 hover:bg-white/10 transition"
        >
          Previous
        </button>
        {activeSection === topic.sections.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onQuizStart}
            className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
          >
            <Play size={18} />
            Start Quiz
          </motion.button>
        ) : (
          <button
            onClick={() => setActiveSection(activeSection + 1)}
            className="px-6 py-3 rounded-xl bg-[#667eea] text-white hover:bg-[#5a6fd6] transition"
          >
            Next Section
          </button>
        )}
      </div>
    </div>
  );
}

// Stats Dashboard
function StatsDashboard({
  totalTopics,
  completedTopics,
  streak,
  correctAnswers
}: {
  totalTopics: number;
  completedTopics: number;
  streak: number;
  correctAnswers: number;
}) {
  const stats = [
    { icon: <BookOpen size={20} />, value: `${completedTopics}/${totalTopics}`, label: 'Topics', color: '#667eea' },
    { icon: <Flame size={20} />, value: streak, label: 'Day Streak', color: '#fa709a' },
    { icon: <Target size={20} />, value: correctAnswers, label: 'Correct', color: '#43e97b' },
    { icon: <Trophy size={20} />, value: Math.floor(completedTopics * 10), label: 'XP', color: '#f8b739' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 35, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex justify-center mb-2" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Achievement Badge
function AchievementBadge({
  title,
  icon,
  unlocked,
  color
}: {
  title: string;
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-2xl text-center transition-all ${unlocked ? 'opacity-100' : 'opacity-40 grayscale'
        }`}
      style={{
        background: unlocked ? `${color}20` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${unlocked ? color : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-xs text-white/80">{title}</div>
    </motion.div>
  );
}

export default function StudyStreamPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<Array<{ correct: boolean; selectedIndex: number }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Progress tracking
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('studyProgress');
    if (savedProgress) setProgress(JSON.parse(savedProgress));

    const savedCorrect = localStorage.getItem('correctAnswers');
    if (savedCorrect) setCorrectAnswers(parseInt(savedCorrect));

    const savedStreak = localStorage.getItem('studyStreak');
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const subjects = getAllSubjects();
  const filteredTopics = getTopicsBySubject(selectedSubject).filter(topic =>
    !searchQuery ||
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuizAnswer = (index: number) => {
    const question = selectedTopic!.practiceQuestions[currentQuestionIndex];
    const correct = index === question.correctAnswer;

    if (correct) {
      setCorrectAnswers(prev => {
        const updated = prev + 1;
        localStorage.setItem('correctAnswers', updated.toString());
        return updated;
      });
    }

    setQuizResults([...quizResults, { correct, selectedIndex: index }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedTopic!.practiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      const correctCount = quizResults.filter(r => r.correct).length +
        (quizResults[quizResults.length - 1]?.correct ? 0 : -1);
      const percentage = Math.round(((correctCount + 1) / selectedTopic!.practiceQuestions.length) * 100);

      // Update progress
      const newProgress = { ...progress, [selectedTopic!.id]: percentage };
      setProgress(newProgress);
      localStorage.setItem('studyProgress', JSON.stringify(newProgress));

      if (percentage >= 70) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const resetQuiz = () => {
    setQuizMode(false);
    setCurrentQuestionIndex(0);
    setQuizResults([]);
  };

  const completedTopics = Object.values(progress).filter(p => p >= 70).length;

  // Achievements
  const achievements = [
    { title: 'First Steps', icon: '🚀', unlocked: completedTopics >= 1, color: '#667eea' },
    { title: 'Quick Learner', icon: '⚡', unlocked: correctAnswers >= 10, color: '#f8b739' },
    { title: 'Streak Master', icon: '🔥', unlocked: streak >= 3, color: '#fa709a' },
    { title: 'Quiz Champion', icon: '🏆', unlocked: correctAnswers >= 25, color: '#43e97b' },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      {showConfetti && <Confetti />}

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/5 via-transparent to-[#764ba2]/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#667eea]/10 border border-[#667eea]/20 mb-6">
            <Sparkles size={16} className="text-[#667eea]" />
            <span className="text-sm text-[#667eea]">AI-Powered Learning</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
              StudyStream
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Master programming with proactive AI suggestions and interactive quizzes
          </p>
        </motion.div>

        {!selectedTopic ? (
          <>
            {/* Stats Dashboard */}
            <StatsDashboard
              totalTopics={studyTopics.length}
              completedTopics={completedTopics}
              streak={streak}
              correctAnswers={correctAnswers}
            />

            {/* Achievements */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="text-[#f8b739]" size={20} />
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((a, i) => (
                  <AchievementBadge key={i} {...a} />
                ))}
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#667eea]/50"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedSubject === 'all'
                      ? 'bg-[#667eea] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                  All Topics
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedSubject === subject
                        ? 'bg-[#667eea] text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    progress={progress[topic.id] || 0}
                    onSelect={() => setSelectedTopic(topic)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <div>
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setSelectedTopic(null);
                resetQuiz();
              }}
              className="mb-6 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center gap-2"
            >
              ← Back to Topics
            </motion.button>

            {/* Topic Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${selectedTopic.color}20, ${selectedTopic.color}05)`,
                border: `1px solid ${selectedTopic.color}30`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="text-5xl p-4 rounded-2xl"
                  style={{ background: `${selectedTopic.color}20` }}
                >
                  {selectedTopic.icon}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{selectedTopic.title}</h1>
                  <p className="text-white/60 mb-4">{selectedTopic.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {selectedTopic.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} /> {selectedTopic.sections.length} sections
                    </span>
                    <span className="flex items-center gap-1">
                      <Target size={14} /> {selectedTopic.practiceQuestions.length} questions
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {!quizMode ? (
              <ContentViewer
                topic={selectedTopic}
                onQuizStart={() => setQuizMode(true)}
              />
            ) : (
              <div className="space-y-6">
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/60">
                    Question {currentQuestionIndex + 1} of {selectedTopic.practiceQuestions.length}
                  </span>
                  <div className="flex gap-1">
                    {selectedTopic.practiceQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`w-8 h-2 rounded-full ${i < currentQuestionIndex
                            ? quizResults[i]?.correct
                              ? 'bg-green-500'
                              : 'bg-red-500'
                            : i === currentQuestionIndex
                              ? 'bg-[#667eea]'
                              : 'bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <QuizComponent
                  question={selectedTopic.practiceQuestions[currentQuestionIndex]}
                  onAnswer={handleQuizAnswer}
                  showResult={quizResults[currentQuestionIndex] || null}
                />

                {quizResults[currentQuestionIndex] && (
                  <div className="flex justify-end gap-4">
                    {currentQuestionIndex === selectedTopic.practiceQuestions.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetQuiz}
                        className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                      >
                        <RotateCcw size={18} />
                        Complete & Review
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-xl bg-[#667eea] text-white font-medium"
                      >
                        Next Question →
                      </motion.button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
