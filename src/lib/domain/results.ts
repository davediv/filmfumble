import { getContentPreset } from '../config/gameOptions.ts';
import type { GameSession } from '../types/index.ts';

export function resultAccuracy(score: number, roundCount: number): number {
	return roundCount > 0 ? Math.round((score / roundCount) * 100) : 0;
}

export function buildResultsShareText(session: GameSession, playUrl?: string): string {
	const roundCount = session.history.length;
	const roundLabel = `${roundCount} ${roundCount === 1 ? 'round' : 'rounds'}`;
	const lines = [
		`FilmFumble score: ${session.score}/${roundCount} (${resultAccuracy(session.score, roundCount)}%).`,
		`Movie mix: ${getContentPreset(session.settings.contentPreset).label} · ${roundLabel}.`,
		'Can you beat my score?'
	];

	if (playUrl) lines.push(playUrl);
	return lines.join('\n');
}
