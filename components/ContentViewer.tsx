'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StudyTopic } from '@/lib/study-data';

interface ContentViewerProps {
    topic: StudyTopic;
    onKeywordsChange: (keywords: string[]) => void;
}

export default function ContentViewer({ topic, onKeywordsChange }: ContentViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Extract keywords from the topic sections for suggestions
        const allKeyTerms = topic.sections.flatMap(section => section.keyTerms);
        onKeywordsChange(allKeyTerms);
    }, [topic, onKeywordsChange]);

    // Simple syntax highlighting
    const highlightCode = (code: string) => {
        return code
            .replace(/(\/\/.*$)/gm, '<span class="highlight-comment">$1</span>')
            .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="highlight-string">$1</span>')
            .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|class|extends|new|this|def|lambda|print|True|False|None)\b/g, '<span class="highlight-keyword">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="highlight-number">$1</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="highlight-function">$1</span>(');
    };

    return (
        <div ref={containerRef} className="content-viewer">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Topic Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="tag subject">{topic.subject}</span>
                        <span className="text-[#64748b] text-sm">•</span>
                        <span className="text-[#64748b] text-sm">
                            {topic.sections.length} sections
                        </span>
                    </div>

                    <h1>{topic.title}</h1>

                    <p className="text-lg text-[#94a3b8]">{topic.description}</p>
                </motion.div>

                {/* Sections */}
                {topic.sections.map((section, index) => (
                    <motion.section
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="mb-12"
                    >
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>

                        {section.codeExample && (
                            <motion.pre
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="overflow-x-auto"
                            >
                                <code
                                    dangerouslySetInnerHTML={{
                                        __html: highlightCode(section.codeExample)
                                    }}
                                />
                            </motion.pre>
                        )}

                        {/* Key Terms */}
                        {section.keyTerms.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {section.keyTerms.map((term, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-xs bg-[#667eea]/20 text-[#667eea] rounded-md"
                                    >
                                        {term}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.section>
                ))}

                {/* Bottom Spacing */}
                <div className="h-20" />
            </motion.article>
        </div>
    );
}
