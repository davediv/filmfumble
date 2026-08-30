import assert from 'node:assert/strict';
import test from 'node:test';
import { answerIndexForKey } from '../src/lib/domain/answerKeyboard.ts';

test('answer shortcuts map letters and number keys to answer indexes', () => {
	assert.equal(answerIndexForKey('a', 4), 0);
	assert.equal(answerIndexForKey('D', 4), 3);
	assert.equal(answerIndexForKey('1', 4), 0);
	assert.equal(answerIndexForKey('4', 4), 3);
});

test('answer shortcuts reject unrelated and unavailable options', () => {
	assert.equal(answerIndexForKey('Enter', 4), null);
	assert.equal(answerIndexForKey('d', 3), null);
	assert.equal(answerIndexForKey('4', 3), null);
});
