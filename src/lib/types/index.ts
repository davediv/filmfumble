export interface Movie {
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
	description: string;
	options: OptionItem[];
	correctIndex: number | null;
}

export type ErrorType = 'network' | 'exhausted' | 'generic';
