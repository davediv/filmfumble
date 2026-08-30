import assert from 'node:assert/strict';
import test from 'node:test';
import { clues } from '../src/lib/services/contentRepository.ts';
import { parseClueReport } from '../src/lib/services/clueReports.ts';

test('clue reports require a matching clue and movie pair', () => {
	const clue = clues[0];
	assert.ok(clue);

	const report = parseClueReport({
		sessionId: 'session-1',
		roundNumber: 1,
		clueId: clue.id,
		movieId: clue.movieId,
		reason: 'ambiguous'
	});

	assert.deepEqual(report, {
		sessionId: 'session-1',
		roundNumber: 1,
		clueId: clue.id,
		movieId: clue.movieId,
		reason: 'ambiguous'
	});
	assert.equal(parseClueReport({ ...report, movieId: 'another-movie' }), null);
});

test('clue reports reject unsupported reasons and malformed identifiers', () => {
	const clue = clues[0];
	assert.ok(clue);

	assert.equal(
		parseClueReport({
			sessionId: '',
			roundNumber: 0,
			clueId: clue.id,
			movieId: clue.movieId,
			reason: 'other'
		}),
		null
	);
});
