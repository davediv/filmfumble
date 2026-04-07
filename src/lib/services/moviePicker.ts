import type { Movie } from '../types/index.ts';
import { movies } from '../data/movies.ts';
import { shuffle, pickRandom } from '../utils.js';

export function pickMovie(usedIds: string[]): Movie | null {
	const used = new Set(usedIds);
	const available = movies.filter((m) => !used.has(m.title));
	if (available.length === 0) return null;
	return pickRandom(available);
}

export function pickDecoys(correctMovie: Movie, count: number = 3): Movie[] {
	const used = new Set([correctMovie.title]);
	const correctGenres = new Set(correctMovie.genres);

	const genreMatched = movies.filter((m) => {
		if (used.has(m.title)) return false;
		if (Math.abs(m.year - correctMovie.year) > 15) return false;
		return m.genres.some((g) => correctGenres.has(g));
	});

	const shuffledGenre = shuffle(genreMatched);
	const result: Movie[] = [];

	for (const decoy of shuffledGenre) {
		if (result.length >= count) break;
		if (!used.has(decoy.title)) {
			result.push(decoy);
			used.add(decoy.title);
		}
	}

	if (result.length < count) {
		const randomPool = shuffle(movies.filter((m) => !used.has(m.title)));
		for (const candidate of randomPool) {
			if (result.length >= count) break;
			result.push(candidate);
			used.add(candidate.title);
		}
	}

	return shuffle(result);
}
