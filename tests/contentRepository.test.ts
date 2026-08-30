import assert from 'node:assert/strict';
import test from 'node:test';
import { filterContent } from '../src/lib/services/contentFilter.ts';
import { clues, getClueForMovie, playableMovies } from '../src/lib/services/contentRepository.ts';

test('every playable movie has a versioned clue with the same movie ID', () => {
	assert.ok(playableMovies.length >= 10);

	for (const movie of playableMovies) {
		const clue = getClueForMovie(movie.id);
		assert.ok(clue);
		assert.equal(clue.movieId, movie.id);
		assert.ok(clue.id.startsWith(`${movie.id}-clue-`));
	}
});

test('curated clues are unique, concise, and pass the safety filter', () => {
	assert.equal(new Set(clues.map((clue) => clue.id)).size, clues.length);

	for (const clue of clues) {
		assert.ok(clue.text.length > 0 && clue.text.length <= 180);
		assert.equal(filterContent(clue.text).safe, true);
	}
});
