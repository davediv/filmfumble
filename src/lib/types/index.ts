export interface Movie {
	id: string;
	title: string;
	year: number;
	genres: string[];
	imdbRating: number;
	posterPath?: string;
}

export interface OptionItem {
	title: string;
	posterPath: string | null;
}

export interface ApiResponse {
	description: string;
	options: OptionItem[];
	correctIndex: number;
	movieId: string;
	usedFallback: boolean;
	error?: string;
}

export interface RoundData {
	movieId: string;
	description: string;
	options: OptionItem[];
	correctIndex: number | null;
}

export type GamePhase = 'start' | 'loading' | 'playing' | 'feedback' | 'ended' | 'error';

export interface GameSettings {
	roundLimit: number | null;
}

export interface RoundResult {
	roundNumber: number;
	movieId: string;
	description: string;
	options: OptionItem[];
	selectedIndex: number;
	correctIndex: number;
	correct: boolean;
}

export interface GameSession {
	id: string;
	phase: GamePhase;
	settings: GameSettings;
	score: number;
	roundNumber: number;
	usedMovieIds: string[];
	selectedIndex: number | null;
	currentRound: RoundData;
	history: RoundResult[];
	errorType: ErrorType | null;
}

export type ErrorType = 'network' | 'exhausted' | 'generic';
