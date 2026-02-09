// Script to push study data to Algolia
// Run with: npx ts-node --esm scripts/push-to-algolia.ts

import { algoliasearch } from 'algoliasearch';
import { studyTopics } from '../lib/study-data';

const appId = 'HEFWEE9Y3E';
const adminKey = process.env.ALGOLIA_ADMIN_KEY || '4f1a778f287bc7be571d233d2f029feb';

async function pushToAlgolia() {
    const client = algoliasearch(appId, adminKey);

    console.log('🚀 Pushing study data to Algolia...');
    console.log(`📚 ${studyTopics.length} topics to upload`);

    try {
        // Transform topics for indexing
        const topicRecords = studyTopics.map(topic => ({
            objectID: topic.id,
            title: topic.title,
            description: topic.description,
            icon: topic.icon,
            color: topic.color,
            subject: topic.subject,
            duration: topic.duration,
            difficulty: topic.difficulty,
            sectionCount: topic.sections.length,
            questionCount: topic.practiceQuestions.length,
            prerequisites: topic.prerequisites,
            learningOutcomes: topic.learningOutcomes,
            keyTerms: topic.sections.flatMap(s => s.keyTerms)
        }));

        // Transform questions for indexing
        const questionRecords = studyTopics.flatMap(topic =>
            topic.practiceQuestions.map((q, index) => ({
                objectID: `${topic.id}_q${index}`,
                topicId: topic.id,
                topicTitle: topic.title,
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
                explanation: q.explanation,
                difficulty: q.difficulty,
                subject: topic.subject
            }))
        );

        console.log(`❓ ${questionRecords.length} questions to upload`);

        // Configure topics index
        await client.setSettings({
            indexName: 'study_topics',
            indexSettings: {
                searchableAttributes: [
                    'title',
                    'description',
                    'subject',
                    'keyTerms',
                    'learningOutcomes'
                ],
                attributesForFaceting: [
                    'filterOnly(subject)',
                    'filterOnly(difficulty)'
                ],
                customRanking: [
                    'asc(difficulty)'
                ]
            }
        });

        // Configure questions index
        await client.setSettings({
            indexName: 'practice_questions',
            indexSettings: {
                searchableAttributes: [
                    'question',
                    'topicTitle',
                    'explanation'
                ],
                attributesForFaceting: [
                    'filterOnly(topicId)',
                    'filterOnly(difficulty)',
                    'filterOnly(subject)'
                ]
            }
        });

        // Save objects
        const topicsResult = await client.saveObjects({
            indexName: 'study_topics',
            objects: topicRecords
        });
        const questionsResult = await client.saveObjects({
            indexName: 'practice_questions',
            objects: questionRecords
        });

        console.log('✅ Successfully pushed data to Algolia!');
        console.log(`📊 Topics Task ID: ${topicsResult.taskID}`);
        console.log(`📊 Questions Task ID: ${questionsResult.taskID}`);
    } catch (error) {
        console.error('❌ Error pushing to Algolia:', error);
    }
}

pushToAlgolia();
