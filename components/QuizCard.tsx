'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, AlertCircle, ArrowRight, Trophy, RefreshCw } from 'lucide-react';
import { StudyMaterial } from '@/lib/study-data';

interface QuizCardProps {
    question: StudyMaterial;
    onClose: () => void;
}

export default function QuizCard({ question, onClose }: QuizCardProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSubmit = () => {
        if (!selectedOption) return;
        const correct = selectedOption === question.answer;
        setIsCorrect(correct);
        setShowAnswer(true);
    };

    const handleReset = () => {
        setSelectedOption(null);
        setShowAnswer(false);
        setIsCorrect(null);
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
                className="quiz-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <span className={`tag difficulty-${question.difficulty}`}>
                            {['', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert'][question.difficulty]}
                        </span>
                        <span className="tag subject">{question.subject}</span>
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
                    <h3 className="text-xl font-semibold text-white mb-4">{question.title}</h3>
                    <div className="p-4 bg-[#0f172a] rounded-xl border border-[rgba(255,255,255,0.06)]">
                        <pre className="text-[#94a3b8] whitespace-pre-wrap font-mono text-sm">
                            {question.content}
                        </pre>
                    </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                    {question.options?.map((option, index) => {
                        let optionClass = 'quiz-option';
                        if (showAnswer) {
                            if (option === question.answer) {
                                optionClass += ' correct';
                            } else if (option === selectedOption && option !== question.answer) {
                                optionClass += ' incorrect';
                            }
                        } else if (option === selectedOption) {
                            optionClass += ' selected';
                        }

                        return (
                            <motion.button
                                key={index}
                                whileHover={{ scale: showAnswer ? 1 : 1.01 }}
                                whileTap={{ scale: showAnswer ? 1 : 0.99 }}
                                onClick={() => !showAnswer && setSelectedOption(option)}
                                disabled={showAnswer}
                                className={optionClass}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-[#1e293b] flex items-center justify-center text-sm font-medium text-[#94a3b8]">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="text-left">{option}</span>
                                    {showAnswer && option === question.answer && (
                                        <Check size={20} className="ml-auto text-[#10b981]" />
                                    )}
                                    {showAnswer && option === selectedOption && option !== question.answer && (
                                        <X size={20} className="ml-auto text-[#ef4444]" />
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
                                ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)]'
                                : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)]'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {isCorrect ? (
                                <>
                                    <Trophy size={24} className="text-[#10b981]" />
                                    <span className="text-lg font-semibold text-[#10b981]">Correct!</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle size={24} className="text-[#ef4444]" />
                                    <span className="text-lg font-semibold text-[#ef4444]">Not quite right</span>
                                </>
                            )}
                        </div>
                        <p className="text-[#94a3b8] text-sm leading-relaxed">
                            {question.explanation}
                        </p>
                    </motion.div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    {!showAnswer ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-[#94a3b8] hover:text-white transition-colors"
                            >
                                Skip for now
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={!selectedOption}
                                className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Check Answer
                                <ArrowRight size={18} />
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 text-[#94a3b8] hover:text-white transition-colors"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl text-white font-medium flex items-center gap-2"
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
