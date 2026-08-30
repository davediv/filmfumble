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

export type Difficulty = 'casual' | 'challenging';

export type ContentPresetId =
	| 'all'
	| Difficulty
	| 'classic'
	| 'modern'
	| 'action'
	| 'crime'
	| 'drama'
	| 'science-fiction';

export interface OptionItem {
	title: string;
	posterPath: string | null;
}

export interface ApiResponse {
	status: 'round';
	clueId: string;
	description: string;
	options: OptionItem[];
	correctIndex: number;
	movieId: string;
	contentSource: Clue['source'];
	error?: string;
}

export interface RoundCompleteResponse {
	status: 'complete';
}

export type RoundApiResponse = ApiResponse | RoundCompleteResponse;

export type RoundApiErrorCode = 'INVALID_REQUEST' | 'CONTENT_UNAVAILABLE' | 'SERVICE_UNAVAILABLE';

export interface RoundApiErrorResponse {
	code: RoundApiErrorCode;
	error: string;
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
	contentPreset: ContentPresetId;
}

export interface RoundResult {
	roundNumber: number;
	clueId: string;
	movieId: string;
	description: string;
	options: OptionItem[];
	selectedIndex: number | null;
	correctIndex: number;
	correct: boolean;
	skipped: boolean;
}

export type ClueReportReason = 'inaccurate' | 'ambiguous' | 'offensive' | 'reveals-answer';

export interface ClueReport {
	sessionId: string;
	roundNumber: number;
	clueId: string;
	movieId: string;
	reason: ClueReportReason;
}

export interface GameSession {
	schemaVersion: 3;
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

export type ErrorType = 'offline' | 'service' | 'content' | 'invalid-response';
