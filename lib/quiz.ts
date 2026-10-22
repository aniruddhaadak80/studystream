export type QuizAnswer = {
  correct: boolean;
  selectedIndex: number;
};

/**
 * Score a finished practice quiz as a percentage.
 *
 * The score is the number of correct answers divided by the number of
 * questions in the quiz. It must not depend on which question was answered
 * last, and it can never be above 100.
 */
export function scoreQuiz(answers: QuizAnswer[], totalQuestions: number): number {
  if (!totalQuestions || totalQuestions <= 0) return 0;
  const correct = answers.reduce((total, answer) => total + (answer.correct ? 1 : 0), 0);
  const percentage = Math.round((correct / totalQuestions) * 100);
  return Math.min(100, Math.max(0, percentage));
}
