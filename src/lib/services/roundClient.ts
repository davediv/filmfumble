import type {
	ApiResponse,
	ContentPresetId,
	ErrorType,
	RoundApiErrorCode,
	RoundApiResponse
} from '../types/index.ts';

export type RoundFetchResult =
	| { ok: true; data: RoundApiResponse }
	| { ok: false; errorType: ErrorType };

export interface RoundRequestInput {
	usedMovieIds: readonly string[];
	contentPreset: ContentPresetId;
}

interface PrefetchedRound {
	key: string;
	request: Promise<RoundFetchResult>;
}

let prefetchedRound: PrefetchedRound | null = null;

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

function roundRequestKey(input: RoundRequestInput): string {
	return JSON.stringify([input.contentPreset, input.usedMovieIds]);
}

function networkFailure(): RoundFetchResult {
	return {
		ok: false,
		errorType:
			typeof navigator !== 'undefined' && navigator.onLine === false ? 'offline' : 'service'
	};
}

export async function requestRound(
	input: RoundRequestInput,
	fetcher: typeof fetch = fetch
): Promise<RoundFetchResult> {
	try {
		const response = await fetcher('/api/round', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(input)
		});
		return await readRoundResponse(response);
	} catch {
		return networkFailure();
	}
}

export function prefetchRound(
	input: RoundRequestInput,
	fetcher: typeof fetch = fetch
): Promise<RoundFetchResult> {
	const request = requestRound(input, fetcher);
	prefetchedRound = { key: roundRequestKey(input), request };
	return request;
}

export function takePrefetchedRound(input: RoundRequestInput): Promise<RoundFetchResult> | null {
	if (!prefetchedRound || prefetchedRound.key !== roundRequestKey(input)) return null;

	const { request } = prefetchedRound;
	prefetchedRound = null;
	return request;
}
