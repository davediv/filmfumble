import assert from 'node:assert/strict';
import test from 'node:test';
import {
	CONTENT_PRESETS,
	getDefaultRoundLimit,
	getRoundLimitOptions
} from '../src/lib/config/gameOptions.ts';
import { filterContent } from '../src/lib/services/contentFilter.ts';
import {
	clues,
	getClueForMovie,
	getPlayableMovies,
	playableMovies
} from '../src/lib/services/contentRepository.ts';

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

test('every curated preset has the documented eligible movie count', () => {
	for (const preset of CONTENT_PRESETS) {
		assert.equal(getPlayableMovies(preset.id).length, preset.availableMovies, preset.id);
	}
});

test('round choices fit their content pool and always offer endless play', () => {
	for (const preset of CONTENT_PRESETS) {
		const options = getRoundLimitOptions(preset.id);
		assert.equal(options.at(-1)?.value, null);
		assert.ok(
			options.every((option) => option.value === null || option.value <= preset.availableMovies)
		);
	}

	assert.equal(getDefaultRoundLimit('all'), 10);
	assert.equal(getDefaultRoundLimit('science-fiction'), 5);
});
