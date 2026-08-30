import { fallbacks } from '../data/fallbacks.ts';
import { movies } from '../data/movies.ts';
import type { Movie } from '../types/index.ts';

export interface FallbackRound {
	movie: Movie;
	description: string;
}

export function getFallbackCandidates(usedMovieIds: readonly string[]): Movie[] {
	const used = new Set(usedMovieIds);
	return movies.filter((movie) => !used.has(movie.title) && Boolean(fallbacks[movie.title]));
}

export function pickFallbackRound(
	usedMovieIds: readonly string[],
	random: () => number = Math.random
): FallbackRound | null {
	const candidates = getFallbackCandidates(usedMovieIds);
	if (candidates.length === 0) return null;

	const randomIndex = Math.min(Math.floor(random() * candidates.length), candidates.length - 1);
	const movie = candidates[Math.max(0, randomIndex)];
	const description = fallbacks[movie.title];

	if (!description) return null;
	return { movie, description };
}
