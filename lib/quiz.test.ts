import { describe, it, expect } from 'vitest';
import { scoreQuiz } from './quiz';

const answers = (flags: boolean[]) => flags.map((correct, index) => ({ correct, selectedIndex: index }));

describe('scoreQuiz', () => {
  it('scores the number of correct answers over the number of questions', () => {
    expect(scoreQuiz(answers([true, true, true, false, true]), 5)).toBe(80);
    expect(scoreQuiz(answers([true, true, true, false, false]), 5)).toBe(60);
    expect(scoreQuiz(answers([false, false, false]), 3)).toBe(0);
  });

  it('does not depend on which question was answered last', () => {
    const lastCorrect = answers([true, true, true, false, true]);
    const lastWrong = answers([true, true, true, true, false]);
    // Same number of correct answers, different answer for the last question.
    expect(scoreQuiz(lastCorrect, 5)).toBe(80);
    expect(scoreQuiz(lastWrong, 5)).toBe(80);
    expect(scoreQuiz(lastCorrect, 5)).toBe(scoreQuiz(lastWrong, 5));
  });

  it('never reports more than 100 percent', () => {
    expect(scoreQuiz(answers([true, true, true, true, true]), 5)).toBe(100);
    expect(scoreQuiz(answers([true, true, true, true, true, true]), 5)).toBe(100);
  });

  it('never reports less than zero percent', () => {
    expect(scoreQuiz(answers([false, false]), 2)).toBe(0);
  });

  it('returns zero when there are no questions', () => {
    expect(scoreQuiz([], 0)).toBe(0);
    expect(scoreQuiz([], 3)).toBe(0);
  });

  it('rounds to whole percent', () => {
    // 2 of 3 is 66.67 percent
    expect(scoreQuiz(answers([true, true, false]), 3)).toBe(67);
  });
});
