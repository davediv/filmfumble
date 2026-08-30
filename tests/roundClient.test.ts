import assert from 'node:assert/strict';
import test from 'node:test';
import { readRoundResponse } from '../src/lib/services/roundClient.ts';

test('round client accepts typed rounds and normal completion', async () => {
	const round = await readRoundResponse(
		Response.json({
			status: 'round',
			clueId: 'movie-clue-1',
			movieId: 'movie-2000',
			description: 'A clue',
			contentSource: 'curated',
			correctIndex: 0,
			options: [{ title: 'Movie', posterPath: null }]
		})
	);
	const complete = await readRoundResponse(Response.json({ status: 'complete' }));

	assert.equal(round.ok, true);
	assert.deepEqual(complete, { ok: true, data: { status: 'complete' } });
});

test('round client maps explicit server errors to actionable UI states', async () => {
	const invalid = await readRoundResponse(
		Response.json({ code: 'INVALID_REQUEST', error: 'bad input' }, { status: 400 })
	);
	const content = await readRoundResponse(
		Response.json({ code: 'CONTENT_UNAVAILABLE', error: 'missing' }, { status: 500 })
	);

	assert.deepEqual(invalid, { ok: false, errorType: 'invalid-response' });
	assert.deepEqual(content, { ok: false, errorType: 'content' });
});

test('round client rejects malformed successful responses', async () => {
	const result = await readRoundResponse(Response.json({ description: 'missing contract' }));
	assert.deepEqual(result, { ok: false, errorType: 'invalid-response' });
});
