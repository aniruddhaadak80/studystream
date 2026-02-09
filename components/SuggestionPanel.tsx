'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, BookOpen, Target } from 'lucide-react';
import { StudyTopic, PracticeQuestion } from '@/lib/study-data';

interface SuggestionPanelProps {
    currentTopic: StudyTopic | null;
    allTopics: StudyTopic[];
    onTopicSelect: (topic: StudyTopic) => void;
}

export default function SuggestionPanel({
    currentTopic,
    allTopics,
    onTopicSelect
}: SuggestionPanelProps) {
    // Get related topics based on current topic
    const getRelatedTopics = (): StudyTopic[] => {
        if (!currentTopic) return allTopics.slice(0, 3);

        return allTopics
            .filter(t => t.id !== currentTopic.id && t.subject === currentTopic.subject)
            .slice(0, 3);
    };

    // Get suggested next topics
    const getNextTopics = (): StudyTopic[] => {
        if (!currentTopic) return [];

        // Find topics with matching prerequisites
        return allTopics
            .filter(t =>
                t.id !== currentTopic.id &&
                t.prerequisites?.some(p => currentTopic.title.toLowerCase().includes(p.toLowerCase()))
            )
            .slice(0, 2);
    };

    const relatedTopics = getRelatedTopics();
    const nextTopics = getNextTopics();

    return (
        <div className="space-y-6">
            {/* AI Suggestions Header */}
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-[#667eea]" size={18} />
                <span className="text-sm font-semibold text-white/80">AI Suggestions</span>
            </div>

            {/* Current Context */}
            {currentTopic && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl"
                    style={{
                        background: `linear-gradient(145deg, ${currentTopic.color}15, ${currentTopic.color}05)`,
                        border: `1px solid ${currentTopic.color}30`,
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-[#667eea]" />
                        <span className="text-xs text-white/60">Currently Studying</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{currentTopic.icon}</span>
                        <span className="font-medium text-white">{currentTopic.title}</span>
                    </div>
                </motion.div>
            )}

            {/* Related Topics */}
            <div>
                <h3 className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
                    <BookOpen size={14} />
                    Related Topics
                </h3>
                <div className="space-y-2">
                    {relatedTopics.map((topic, i) => (
                        <motion.button
                            key={topic.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => onTopicSelect(topic)}
                            className="w-full p-3 rounded-xl text-left transition-all hover:bg-white/10"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{topic.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{topic.title}</p>
                                    <p className="text-xs text-white/50">{topic.subject}</p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Suggested Next */}
            {nextTopics.length > 0 && (
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-white/70 mb-3">
                        <Target size={14} />
                        Up Next
                    </h3>
                    <div className="space-y-2">
                        {nextTopics.map((topic, i) => (
                            <motion.button
                                key={topic.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => onTopicSelect(topic)}
                                className="w-full p-3 rounded-xl text-left transition-all hover:bg-white/10"
                                style={{
                                    background: 'linear-gradient(145deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05))',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{topic.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{topic.title}</p>
                                        <p className="text-xs text-[#667eea]">Recommended</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium text-white/70 mb-3">Quick Tips</h3>
                <ul className="text-xs text-white/50 space-y-2">
                    <li>• Complete quizzes to track progress</li>
                    <li>• Practice daily to build streak</li>
                    <li>• Review key terms after each section</li>
                </ul>
            </div>
        </div>
    );
}
