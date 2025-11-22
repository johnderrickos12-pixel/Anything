export interface Player {
  id: string;
  name: string;
  score: number;
}

export type CardType = 'dare' | 'question' | 'command';
export type IntensityLevel = 'intimate' | 'passionate' | 'ecstatic';

export interface Card {
  id: string;
  type: CardType;
  level: IntensityLevel;
  content: string;
}

export interface GameState {
  players: Player[];
  currentPlayerId: string | null;
  currentCard: Card | null;
  intensity: IntensityLevel;
  gameStarted: boolean;
  setupComplete: boolean;
}
