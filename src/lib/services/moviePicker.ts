/**
 * Movie picker service — handles random selection and decoy generation.
 */

import type { Movie } from '../types/index.ts';
import { movies } from '../data/movies.ts';

/**
 * Pick a random movie not in the usedIds list.
 * Returns null if all movies have been used.
 */
export function pickMovie(usedIds: string[]): Movie | null {
	const available = movies.filter((m) => !usedIds.includes(m.title));
	if (available.length === 0) return null;
	return available[Math.floor(Math.random() * available.length)];
}

/**
 * Pick decoy movies that share ≥ 1 genre with the correct movie.
 * Falls back to random movies if not enough genre-matched are available.
 */
export function pickDecoys(correctMovie: Movie, count: number = 3): Movie[] {
	const usedIds = [correctMovie.title];

	// Try to find genre-matched movies first
	const genreMatched = movies.filter((m) => {
		if (usedIds.includes(m.title)) return false;
		if (m.title === correctMovie.title) return false;
		const yearDiff = Math.abs(m.year - correctMovie.year);
		if (yearDiff > 15) return false;
		return m.genres.some((g) => correctMovie.genres.includes(g));
	});

	// Shuffle genre-matched
	const shuffled = genreMatched.sort(() => Math.random() - 0.5);

	// Take as many as needed from genre-matched, then fill with random
	const result: Movie[] = [];
	const genrePool = [...shuffled];

	while (result.length < count && genrePool.length > 0) {
		const decoy = genrePool.pop()!;
		if (!usedIds.includes(decoy.title) && decoy.title !== correctMovie.title) {
			result.push(decoy);
			usedIds.push(decoy.title);
		}
	}

	// Fill remaining slots with random movies (still respecting usedIds)
	const randomPool = movies
		.filter((m) => !usedIds.includes(m.title) && m.title !== correctMovie.title)
		.sort(() => Math.random() - 0.5);

	for (const candidate of randomPool) {
		if (result.length >= count) break;
		result.push(candidate);
		usedIds.push(candidate.title);
	}

	return result.sort(() => Math.random() - 0.5);
}
