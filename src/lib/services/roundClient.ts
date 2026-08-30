import type {
	ApiResponse,
	ErrorType,
	RoundApiErrorCode,
	RoundApiResponse
} from '../types/index.ts';

export type RoundFetchResult =
	| { ok: true; data: RoundApiResponse }
	| { ok: false; errorType: ErrorType };

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isRoundResponse(value: unknown): value is ApiResponse {
	if (!isRecord(value) || value.status !== 'round' || !Array.isArray(value.options)) return false;
	return (
		typeof value.clueId === 'string' &&
		typeof value.movieId === 'string' &&
		typeof value.description === 'string' &&
		value.contentSource === 'curated' &&
		Number.isInteger(value.correctIndex) &&
		Number(value.correctIndex) >= 0 &&
		Number(value.correctIndex) < value.options.length &&
		value.options.every(
			(option) =>
				isRecord(option) &&
				typeof option.title === 'string' &&
				(option.posterPath === null || typeof option.posterPath === 'string')
		)
	);
}

function isRoundApiResponse(value: unknown): value is RoundApiResponse {
	return (isRecord(value) && value.status === 'complete') || isRoundResponse(value);
}

function errorTypeForCode(code: unknown): ErrorType {
	switch (code as RoundApiErrorCode) {
		case 'INVALID_REQUEST':
			return 'invalid-response';
		case 'CONTENT_UNAVAILABLE':
			return 'content';
		case 'SERVICE_UNAVAILABLE':
			return 'service';
		default:
			return 'service';
	}
}

export async function readRoundResponse(response: Response): Promise<RoundFetchResult> {
	let payload: unknown;
	try {
		payload = await response.json();
	} catch {
		return { ok: false, errorType: 'invalid-response' };
	}

	if (!response.ok) {
		return {
			ok: false,
			errorType: isRecord(payload) ? errorTypeForCode(payload.code) : 'service'
		};
	}

	return isRoundApiResponse(payload)
		? { ok: true, data: payload }
		: { ok: false, errorType: 'invalid-response' };
}
