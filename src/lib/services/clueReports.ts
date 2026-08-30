import { getClueById } from './contentRepository.ts';
import type { ClueReport, ClueReportReason } from '../types/index.ts';

const REPORT_REASONS: ClueReportReason[] = [
	'inaccurate',
	'ambiguous',
	'offensive',
	'reveals-answer'
];

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

export function isClueReportReason(value: unknown): value is ClueReportReason {
	return REPORT_REASONS.includes(value as ClueReportReason);
}

export function parseClueReport(value: unknown): ClueReport | null {
	if (
		!isRecord(value) ||
		typeof value.sessionId !== 'string' ||
		value.sessionId.length === 0 ||
		value.sessionId.length > 64 ||
		!Number.isInteger(value.roundNumber) ||
		Number(value.roundNumber) < 1 ||
		typeof value.clueId !== 'string' ||
		typeof value.movieId !== 'string' ||
		!isClueReportReason(value.reason)
	) {
		return null;
	}

	const clue = getClueById(value.clueId);
	if (!clue || clue.movieId !== value.movieId) return null;

	return {
		sessionId: value.sessionId,
		roundNumber: Number(value.roundNumber),
		clueId: value.clueId,
		movieId: value.movieId,
		reason: value.reason
	};
}
