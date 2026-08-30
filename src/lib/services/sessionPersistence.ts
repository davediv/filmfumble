import { CONTENT_PRESETS } from '../config/gameOptions.ts';
import type {
	GamePhase,
	GameSession,
	GameSettings,
	OptionItem,
	RoundData,
	RoundResult
} from '../types/index.ts';

const SESSION_KEY = 'filmfumble.game-session.v1';
const SETTINGS_KEY = 'filmfumble.game-settings.v1';
const GAME_PHASES: GamePhase[] = ['start', 'loading', 'playing', 'feedback', 'ended', 'error'];

export interface SessionStorageAdapter {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isOption(value: unknown): value is OptionItem {
	return (
		isRecord(value) &&
		typeof value.title === 'string' &&
		(value.posterPath === null || typeof value.posterPath === 'string')
	);
}

function isRoundData(value: unknown): value is RoundData {
	return (
		isRecord(value) &&
		typeof value.clueId === 'string' &&
		typeof value.movieId === 'string' &&
		typeof value.description === 'string' &&
		Array.isArray(value.options) &&
		value.options.every(isOption) &&
		(value.correctIndex === null || Number.isInteger(value.correctIndex))
	);
}

function isRoundResult(value: unknown): value is RoundResult {
	return (
		isRoundData(value) &&
		'roundNumber' in value &&
		'selectedIndex' in value &&
		'correct' in value &&
		Number.isInteger(value.roundNumber) &&
		Number.isInteger(value.selectedIndex) &&
		Number.isInteger(value.correctIndex) &&
		typeof value.correct === 'boolean'
	);
}

export function isGameSettings(value: unknown): value is GameSettings {
	return (
		isRecord(value) &&
		(value.roundLimit === null ||
			(Number.isInteger(value.roundLimit) && Number(value.roundLimit) > 0)) &&
		CONTENT_PRESETS.some((preset) => preset.id === value.contentPreset)
	);
}

export function isGameSession(value: unknown): value is GameSession {
	return (
		isRecord(value) &&
		value.schemaVersion === 1 &&
		typeof value.id === 'string' &&
		GAME_PHASES.includes(value.phase as GamePhase) &&
		isGameSettings(value.settings) &&
		Number.isInteger(value.score) &&
		Number.isInteger(value.roundNumber) &&
		Array.isArray(value.usedMovieIds) &&
		value.usedMovieIds.every((id) => typeof id === 'string') &&
		(value.selectedIndex === null || Number.isInteger(value.selectedIndex)) &&
		isRoundData(value.currentRound) &&
		Array.isArray(value.history) &&
		value.history.every(isRoundResult) &&
		(value.errorType === null ||
			value.errorType === 'network' ||
			value.errorType === 'exhausted' ||
			value.errorType === 'generic')
	);
}

function readJson(storage: SessionStorageAdapter, key: string): unknown {
	try {
		const stored = storage.getItem(key);
		return stored ? JSON.parse(stored) : null;
	} catch {
		return null;
	}
}

export function loadGameSession(storage: SessionStorageAdapter): GameSession | null {
	const value = readJson(storage, SESSION_KEY);
	return isGameSession(value) ? value : null;
}

export function saveGameSession(storage: SessionStorageAdapter, session: GameSession): void {
	try {
		storage.setItem(SESSION_KEY, JSON.stringify(session));
	} catch {
		// The game remains playable when browser storage is unavailable.
	}
}

export function clearGameSession(storage: SessionStorageAdapter): void {
	try {
		storage.removeItem(SESSION_KEY);
	} catch {
		// Nothing else is required when browser storage is unavailable.
	}
}

export function loadGameSettings(storage: SessionStorageAdapter): GameSettings | null {
	const value = readJson(storage, SETTINGS_KEY);
	return isGameSettings(value) ? value : null;
}

export function saveGameSettings(storage: SessionStorageAdapter, settings: GameSettings): void {
	try {
		storage.setItem(SETTINGS_KEY, JSON.stringify(settings));
	} catch {
		// Settings persistence is optional.
	}
}
