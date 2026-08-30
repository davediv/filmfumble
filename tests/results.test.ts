import assert from 'node:assert/strict';
import test from 'node:test';
import { beginGameSession } from '../src/lib/domain/gameSession.ts';
import { buildResultsShareText, resultAccuracy } from '../src/lib/domain/results.ts';
import { shareResultsText } from '../src/lib/services/resultsSharing.ts';

test('results sharing text is concise and contains no answer spoilers', () => {
	const session = beginGameSession({ roundLimit: 5, contentPreset: 'casual' }, 'results-session');
	const completed = {
		...session,
		phase: 'ended' as const,
		score: 3,
		history: Array.from({ length: 5 }, (_, index) => ({
			roundNumber: index + 1,
			clueId: `clue-${index}`,
			movieId: `secret-movie-${index}`,
			description: `Secret clue ${index}`,
			options: [{ title: `Secret answer ${index}`, posterPath: null }],
			selectedIndex: 0,
			correctIndex: 0,
			correct: index < 3,
			skipped: false
		}))
	};

	const text = buildResultsShareText(completed, 'https://example.com/');

	assert.match(text, /FilmFumble score: 3\/5 \(60%\)/);
	assert.match(text, /Movie mix: Crowd pleasers/);
	assert.match(text, /https:\/\/example.com\//);
	assert.doesNotMatch(text, /Secret clue|Secret answer|secret-movie/);
	assert.equal(resultAccuracy(0, 0), 0);
});

test('results sharing prefers native share and falls back to copy', async () => {
	let copied = '';
	const shared = await shareResultsText('score', {
		share: async () => undefined,
		copy: async (text) => {
			copied = text;
		}
	});
	assert.equal(shared, 'shared');
	assert.equal(copied, '');

	const copiedOutcome = await shareResultsText('fallback score', {
		share: async () => {
			throw new Error('not supported');
		},
		copy: async (text) => {
			copied = text;
		}
	});
	assert.equal(copiedOutcome, 'copied');
	assert.equal(copied, 'fallback score');
});

test('results sharing treats user cancellation separately from platform failure', async () => {
	const abortError = new Error('cancelled');
	abortError.name = 'AbortError';

	assert.equal(
		await shareResultsText('score', {
			share: async () => {
				throw abortError;
			},
			copy: async () => {
				throw new Error('copy should not run after cancellation');
			}
		}),
		'cancelled'
	);
	assert.equal(await shareResultsText('score', {}), 'unavailable');
});
