import type {
	ApiResponse,
	ErrorType,
	GameSession,
	GameSettings,
	RoundData,
	RoundResult
} from '../types/index.ts';

const EMPTY_ROUND: RoundData = {
	movieId: '',
	description: '',
	options: [],
	correctIndex: null
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
	roundLimit: null
};

export function createGameSession(settings: GameSettings = DEFAULT_GAME_SETTINGS): GameSession {
	return {
		id: '',
		phase: 'start',
		settings: { ...settings },
		score: 0,
		roundNumber: 0,
		usedMovieIds: [],
		selectedIndex: null,
		currentRound: { ...EMPTY_ROUND },
		history: [],
		errorType: null
	};
}

export function beginGameSession(
	settings: GameSettings = DEFAULT_GAME_SETTINGS,
	sessionId: string = crypto.randomUUID()
): GameSession {
	return {
		...createGameSession(settings),
		id: sessionId,
		phase: 'loading',
		roundNumber: 1
	};
}

export function receiveRound(session: GameSession, data: ApiResponse): GameSession {
	return {
		...session,
		phase: 'playing',
		usedMovieIds: [...session.usedMovieIds, data.movieId],
		selectedIndex: null,
		currentRound: {
			movieId: data.movieId,
			description: data.description,
			options: data.options,
			correctIndex: data.correctIndex
		},
		errorType: null
	};
}

export function requestRound(session: GameSession): GameSession {
	return { ...session, phase: 'loading', errorType: null };
}

export function answerCurrentRound(session: GameSession, selectedIndex: number): GameSession {
	const { currentRound } = session;
	if (
		session.phase !== 'playing' ||
		currentRound.correctIndex === null ||
		selectedIndex < 0 ||
		selectedIndex >= currentRound.options.length
	) {
		return session;
	}

	const correct = selectedIndex === currentRound.correctIndex;
	const result: RoundResult = {
		roundNumber: session.roundNumber,
		movieId: currentRound.movieId,
		description: currentRound.description,
		options: currentRound.options,
		selectedIndex,
		correctIndex: currentRound.correctIndex,
		correct
	};

	return {
		...session,
		phase: 'feedback',
		selectedIndex,
		score: session.score + (correct ? 1 : 0),
		history: [...session.history, result]
	};
}

export function prepareNextRound(session: GameSession): GameSession {
	if (session.phase !== 'feedback') return session;

	return {
		...session,
		phase: 'loading',
		roundNumber: session.roundNumber + 1,
		selectedIndex: null,
		errorType: null
	};
}

export function completeGameSession(session: GameSession): GameSession {
	return {
		...session,
		phase: 'ended',
		roundNumber: session.history.length,
		selectedIndex: null,
		errorType: null
	};
}

export function failGameSession(session: GameSession, errorType: ErrorType): GameSession {
	return { ...session, phase: 'error', errorType };
}
