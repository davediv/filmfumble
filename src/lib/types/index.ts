export interface Movie {
	id: string;
	title: string;
	year: number;
	genres: string[];
	imdbRating: number;
	posterPath?: string;
}

export interface Clue {
	id: string;
	movieId: string;
	text: string;
	version: number;
	source: 'curated';
}

export interface OptionItem {
	title: string;
	posterPath: string | null;
}

export interface ApiResponse {
	clueId: string;
	description: string;
	options: OptionItem[];
	correctIndex: number;
	movieId: string;
	contentSource: Clue['source'];
	error?: string;
}

export interface RoundData {
	clueId: string;
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
	clueId: string;
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
