import { Identifiable } from './id';

export * from './id';

export interface LevelData {
  topicId: string;
  level: number;
  rows: number;
  cols: number;
  cards: string[];
}

export interface Topic extends Identifiable {
  level: number;
  played: number;
  words: string[];
}

export interface GameState {
  score: number;
  instance: number;
  topics: Topic[];
  level: LevelData | null;
}

export interface FlipState {
  score: number;
}
