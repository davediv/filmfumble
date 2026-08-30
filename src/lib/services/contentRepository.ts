import { fallbacks } from '../data/fallbacks.ts';
import { movies } from '../data/movies.ts';
import type { Clue, ContentPresetId, Difficulty, Movie } from '../types/index.ts';

const CLUE_VERSION = 1;
const CASUAL_MOVIE_IDS = new Set([
	'the-dark-knight-2008',
	'inception-2010',
	'the-matrix-1999',
	'gladiator-2000',
	'interstellar-2014',
	'back-to-the-future-1985',
	'spirited-away-2001',
	'the-lion-king-1994',
	'forrest-gump-1994',
	'the-godfather-1972',
	'fight-club-1999',
	'the-avengers-2012'
]);

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

export function getMovieDifficulty(movieId: string): Difficulty {
	return CASUAL_MOVIE_IDS.has(movieId) ? 'casual' : 'challenging';
}

export function getPlayableMovies(contentPreset: ContentPresetId = 'all'): Movie[] {
	return playableMovies.filter((movie) => {
		switch (contentPreset) {
			case 'casual':
			case 'challenging':
				return getMovieDifficulty(movie.id) === contentPreset;
			case 'classic':
				return movie.year < 2000;
			case 'modern':
				return movie.year >= 2000;
			case 'action':
				return movie.genres.includes('Action');
			case 'crime':
				return movie.genres.includes('Crime');
			case 'drama':
				return movie.genres.includes('Drama');
			case 'science-fiction':
				return movie.genres.includes('Science Fiction');
			case 'all':
				return true;
		}
	});
}

export function isContentPresetId(value: unknown): value is ContentPresetId {
	return (
		value === 'all' ||
		value === 'casual' ||
		value === 'challenging' ||
		value === 'classic' ||
		value === 'modern' ||
		value === 'action' ||
		value === 'crime' ||
		value === 'drama' ||
		value === 'science-fiction'
	);
}

export function getClueForMovie(movieId: string): Clue | null {
	return clues.find((clue) => clue.movieId === movieId) ?? null;
}
