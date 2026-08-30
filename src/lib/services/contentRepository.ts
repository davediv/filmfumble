import { fallbacks } from '../data/fallbacks.ts';
import { movies } from '../data/movies.ts';
import type { Clue, Movie } from '../types/index.ts';

const CLUE_VERSION = 1;

export const clues: Clue[] = movies.flatMap((movie) => {
	const text = fallbacks[movie.title];
	if (!text) return [];

	return [
		{
			id: `${movie.id}-clue-${CLUE_VERSION}`,
			movieId: movie.id,
			text,
			version: CLUE_VERSION,
			source: 'curated'
		}
	];
});

const playableMovieIds = new Set(clues.map((clue) => clue.movieId));

export const playableMovies: Movie[] = movies.filter((movie) => playableMovieIds.has(movie.id));

export function getClueForMovie(movieId: string): Clue | null {
	return clues.find((clue) => clue.movieId === movieId) ?? null;
}
