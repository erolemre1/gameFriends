export type GameType = '101' | 'Duz' | 'Esli101';
export type TableStatus = 'waiting' | 'full' | 'playing';

export interface Player {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  isHost: boolean;
}

export interface Table {
  id: string;
  venueName: string;
  venueAddress: string;
  gameType: GameType;
  requiredPlayers: number;
  currentPlayers: Player[];
  note?: string;
  createdAt: string;
}