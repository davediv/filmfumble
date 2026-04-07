export interface Movie {
	title: string;
	year: number;
	genres: string[];
	imdbRating: number;
	posterUrl?: string;
}

export interface ApiResponse {
	description: string;
	options: string[];
	correctIndex: number;
	movieId: string;
	usedFallback: boolean;
	error?: string;
}

export interface RoundData {
	description: string;
	options: string[];
	correctIndex: number | null;
}

export interface RoundResult {
	selectedIndex: number;
	correct: boolean;
}

export type GamePhase = 'idle' | 'playing' | 'answering' | 'feedback' | 'ended';

export type ErrorType = 'network' | 'exhausted' | 'generic';

export interface GameState {
	score: number;
	roundNumber: number;
	usedMovieIds: string[];
	phase: GamePhase;
}
