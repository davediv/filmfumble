import assert from 'node:assert/strict';
import test from 'node:test';
import { fallbacks } from '../src/lib/data/fallbacks.ts';
import { getFallbackCandidates, pickFallbackRound } from '../src/lib/services/fallbackPicker.ts';

test('fallback candidates always have a matching clue', () => {
	const candidates = getFallbackCandidates([]);

	assert.ok(candidates.length > 0);
	for (const movie of candidates) {
		assert.equal(typeof fallbacks[movie.title], 'string');
		assert.ok(fallbacks[movie.title].length > 0);
	}
});

test('fallback selection never returns a used movie', () => {
	const candidates = getFallbackCandidates([]);
	const usedMovieIds = candidates.slice(0, 3).map((movie) => movie.id);
	const round = pickFallbackRound(usedMovieIds, () => 0);

	assert.ok(round);
	assert.ok(!usedMovieIds.includes(round.movie.id));
	assert.equal(round.description, fallbacks[round.movie.title]);
});

test('fallback selection returns null after safe content is exhausted', () => {
	const allCandidateIds = getFallbackCandidates([]).map((movie) => movie.id);
	assert.equal(pickFallbackRound(allCandidateIds), null);
});
