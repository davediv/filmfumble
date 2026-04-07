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

export type ErrorType = 'network' | 'exhausted' | 'generic';
