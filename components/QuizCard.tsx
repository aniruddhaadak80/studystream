'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, ArrowRight, Trophy, RefreshCw } from 'lucide-react';
import { PracticeQuestion } from '@/lib/study-data';

interface QuizCardProps {
    question: PracticeQuestion;
    onClose: () => void;
    onAnswer?: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, onClose, onAnswer }: QuizCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const correct = selectedOption === question.correctAnswer;
        setIsCorrect(correct);
        setShowAnswer(true);
        onAnswer?.(correct);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setShowAnswer(false);
        setIsCorrect(null);
    };

    const getDifficultyLabel = (difficulty: string) => {
        const labels: Record<string, string> = {
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
        };
        return labels[difficulty] || difficulty;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="quiz-card max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#1a1a24] rounded-2xl p-6 border border-white/10"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${question.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                            question.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                            }`}>
                            {getDifficultyLabel(question.difficulty)}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <X size={20} className="text-[#94a3b8]" />
                    </button>
                </div>

                {/* Question */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {question.options.map((option, index) => {
                        let optionClass = 'w-full p-4 rounded-xl border text-left transition-all ';
                        if (showAnswer) {
                            if (index === question.correctAnswer) {
                                optionClass += 'bg-green-500/10 border-green-500/50 text-white';
                            } else if (index === selectedOption && index !== question.correctAnswer) {
                                optionClass += 'bg-red-500/10 border-red-500/50 text-white';
                            } else {
                                optionClass += 'bg-white/5 border-white/10 text-white/60';
                            }
                        } else if (index === selectedOption) {
                            optionClass += 'bg-[#667eea]/20 border-[#667eea]/50 text-white';
                        } else {
                            optionClass += 'bg-white/5 border-white/10 text-white hover:bg-white/10';
                        }

                        return (
                            <motion.button
                                key={index}
                                whileHover={{ scale: showAnswer ? 1 : 1.01 }}
                                whileTap={{ scale: showAnswer ? 1 : 0.99 }}
                                onClick={() => !showAnswer && setSelectedOption(index)}
                                disabled={showAnswer}
                                className={optionClass}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-medium">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="flex-1 text-left">{option}</span>
                                    {showAnswer && index === question.correctAnswer && (
                                        <Check size={20} className="text-green-400" />
                                    )}
                                    {showAnswer && index === selectedOption && index !== question.correctAnswer && (
                                        <X size={20} className="text-red-400" />
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Result */}
                {showAnswer && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl mb-6 ${isCorrect
                            ? 'bg-green-500/10 border border-green-500/30'
                            : 'bg-red-500/10 border border-red-500/30'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {isCorrect ? (
                                <>
                                    <Trophy size={24} className="text-green-400" />
                                    <span className="text-lg font-semibold text-green-400">Correct!</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle size={24} className="text-red-400" />
                                    <span className="text-lg font-semibold text-red-400">Not quite right</span>
                                </>
                            )}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {question.explanation}
                        </p>
                    </motion.div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {!showAnswer ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                            >
                                Skip for now
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={selectedOption === null}
                                className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Check Answer
                                <ArrowRight size={18} />
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl text-white font-medium flex items-center gap-2"
                            >
                                Continue Studying
                                <ArrowRight size={18} />
                            </motion.button>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
