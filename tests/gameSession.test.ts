import assert from 'node:assert/strict';
import test from 'node:test';
import {
	answerCurrentRound,
	beginGameSession,
	completeGameSession,
	hasReachedRoundLimit,
	prepareNextRound,
	receiveRound,
	restartContentCycle
} from '../src/lib/domain/gameSession.ts';
import type { ApiResponse } from '../src/lib/types/index.ts';

const round: ApiResponse = {
	clueId: 'correct-2000-clue-1',
	description: 'A test clue',
	options: [
		{ title: 'Correct', posterPath: null },
		{ title: 'Wrong', posterPath: null }
	],
	correctIndex: 0,
	movieId: 'correct-2000',
	contentSource: 'curated'
};

test('session transitions preserve one coherent game state', () => {
	let session = beginGameSession({ roundLimit: null, contentPreset: 'all' }, 'session-1');
	assert.equal(session.phase, 'loading');
	assert.equal(session.roundNumber, 1);

	session = receiveRound(session, round);
	assert.equal(session.phase, 'playing');
	assert.deepEqual(session.usedMovieIds, ['correct-2000']);

	session = answerCurrentRound(session, 0);
	assert.equal(session.phase, 'feedback');
	assert.equal(session.score, 1);
	assert.equal(session.history.length, 1);

	session = prepareNextRound(session);
	assert.equal(session.phase, 'loading');
	assert.equal(session.roundNumber, 2);

	session = completeGameSession(session);
	assert.equal(session.phase, 'ended');
	assert.equal(session.roundNumber, 1);
});

test('answer transitions reject invalid phases and option indexes', () => {
	const loadingSession = beginGameSession({ roundLimit: null, contentPreset: 'all' }, 'session-2');
	assert.equal(answerCurrentRound(loadingSession, 0), loadingSession);

	const playingSession = receiveRound(loadingSession, round);
	assert.equal(answerCurrentRound(playingSession, 4), playingSession);
});

test('finite sessions complete after their configured answer count', () => {
	let session = beginGameSession({ roundLimit: 1, contentPreset: 'all' }, 'session-3');
	session = receiveRound(session, round);
	session = answerCurrentRound(session, 1);

	assert.equal(hasReachedRoundLimit(session), true);
	assert.equal(prepareNextRound(session).phase, 'ended');
});

test('endless sessions can restart the content cycle without losing history', () => {
	let session = beginGameSession({ roundLimit: null, contentPreset: 'all' }, 'session-4');
	session = receiveRound(session, round);
	session = answerCurrentRound(session, 0);
	session = prepareNextRound(session);
	session = restartContentCycle(session);

	assert.deepEqual(session.usedMovieIds, []);
	assert.equal(session.history.length, 1);
	assert.equal(session.roundNumber, 2);
});
