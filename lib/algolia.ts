import { algoliasearch } from 'algoliasearch';

// Initialize Algolia client
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'HEFWEE9Y3E';
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '94429ad9effe4b2619867de4b6897d0e';
const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';

// Search client (for frontend)
export const searchClient = algoliasearch(appId, searchKey);

// Admin client (for indexing - server-side only)
export const adminClient = adminKey ? algoliasearch(appId, adminKey) : null;

// Index names
export const TOPICS_INDEX = 'study_topics';
export const QUESTIONS_INDEX = 'practice_questions';

// Types
export interface StudyTopicRecord {
    objectID: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    subject: string;
    duration: string;
    difficulty: string;
    sectionCount: number;
    questionCount: number;
    prerequisites: string[];
    learningOutcomes: string[];
    keyTerms: string[];
}

export interface QuestionRecord {
    objectID: string;
    topicId: string;
    topicTitle: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
    subject: string;
}

// Search topics
export async function searchTopics(query: string, filters?: {
    subject?: string;
    difficulty?: string;
}) {
    let filterString = '';

    if (filters) {
        const filterParts: string[] = [];

        if (filters.subject && filters.subject !== 'all') {
            filterParts.push(`subject:${filters.subject}`);
        }

        if (filters.difficulty) {
            filterParts.push(`difficulty:${filters.difficulty}`);
        }

        filterString = filterParts.join(' AND ');
    }

    try {
        const results = await searchClient.searchSingleIndex({
            indexName: TOPICS_INDEX,
            searchParams: {
                query,
                filters: filterString,
                hitsPerPage: 20,
            }
        });

        return results.hits as unknown as StudyTopicRecord[];
    } catch (error) {
        console.error('Algolia search error:', error);
        return [];
    }
}

// Get related questions for a topic
export async function getRelatedQuestions(topicId: string, difficulty?: string) {
    let filterString = `topicId:${topicId}`;

    if (difficulty) {
        filterString += ` AND difficulty:${difficulty}`;
    }

    try {
        const results = await searchClient.searchSingleIndex({
            indexName: QUESTIONS_INDEX,
            searchParams: {
                query: '',
                filters: filterString,
                hitsPerPage: 10,
            }
        });

        return results.hits as unknown as QuestionRecord[];
    } catch (error) {
        console.error('Algolia search error:', error);
        return [];
    }
}

// Get suggested topics based on current topic
export async function getSuggestedTopics(currentSubject: string, excludeId: string) {
    try {
        const results = await searchClient.searchSingleIndex({
            indexName: TOPICS_INDEX,
            searchParams: {
                query: '',
                filters: `subject:${currentSubject} AND NOT objectID:${excludeId}`,
                hitsPerPage: 3,
            }
        });

        return results.hits as unknown as StudyTopicRecord[];
    } catch (error) {
        console.error('Algolia search error:', error);
        return [];
    }
}
