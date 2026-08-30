import type { Movie } from '$lib/types/index';
import { movies } from '$lib/data/movies';
import { shuffle, pickRandom } from '$lib/utils';

export function pickMovie(usedIds: string[]): Movie | null {
	const used = new Set(usedIds);
	const available = movies.filter((m) => !used.has(m.id));
	if (available.length === 0) return null;
	return pickRandom(available);
}

export function pickDecoys(correctMovie: Movie, count: number = 3): Movie[] {
	const used = new Set([correctMovie.id]);
	const correctGenres = new Set(correctMovie.genres);

	const genreMatched = movies.filter((m) => {
		if (used.has(m.id)) return false;
		if (Math.abs(m.year - correctMovie.year) > 15) return false;
		return m.genres.some((g) => correctGenres.has(g));
	});

	const result = shuffle(genreMatched).slice(0, count);
	for (const m of result) used.add(m.id);

	if (result.length < count) {
		const filler = shuffle(movies.filter((m) => !used.has(m.id)));
		result.push(...filler.slice(0, count - result.length));
	}

	return shuffle(result);
}
