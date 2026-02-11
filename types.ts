export enum GameState {
  INTRO = 'INTRO',
  MEMORY_GAME = 'MEMORY_GAME',
  QUIZ = 'QUIZ',
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS'
}

export interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number; // In our cute version, all answers might be correct, or specific cute logic
}
