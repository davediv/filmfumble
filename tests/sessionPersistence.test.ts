import assert from 'node:assert/strict';
import test from 'node:test';
import { beginGameSession, DEFAULT_GAME_SETTINGS } from '../src/lib/domain/gameSession.ts';
import {
	clearGameSession,
	loadGameSession,
	loadGameSettings,
	saveGameSession,
	saveGameSettings,
	type SessionStorageAdapter
} from '../src/lib/services/sessionPersistence.ts';

class MemoryStorage implements SessionStorageAdapter {
	private values = new Map<string, string>();

	getItem(key: string): string | null {
		return this.values.get(key) ?? null;
	}

	setItem(key: string, value: string): void {
		this.values.set(key, value);
	}

	removeItem(key: string): void {
		this.values.delete(key);
	}
}

test('active sessions survive serialization and can be cleared', () => {
	const storage = new MemoryStorage();
	const session = beginGameSession(DEFAULT_GAME_SETTINGS, 'persisted-session');

	saveGameSession(storage, session);
	assert.deepEqual(loadGameSession(storage), session);

	clearGameSession(storage);
	assert.equal(loadGameSession(storage), null);
});

test('invalid or stale session payloads are rejected', () => {
	const storage = new MemoryStorage();
	storage.setItem('filmfumble.game-session.v1', '{"schemaVersion":0}');
	assert.equal(loadGameSession(storage), null);

	storage.setItem('filmfumble.game-session.v1', 'not-json');
	assert.equal(loadGameSession(storage), null);
});

test('game settings persist independently from active progress', () => {
	const storage = new MemoryStorage();
	const settings = { roundLimit: 5, contentPreset: 'science-fiction' } as const;

	saveGameSettings(storage, settings);
	assert.deepEqual(loadGameSettings(storage), settings);
});
