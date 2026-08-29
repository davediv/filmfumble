import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pickMovie, pickDecoys } from '$lib/services/moviePicker';
import { generateDescription } from '$lib/services/openrouter';
import { filterContent } from '$lib/services/contentFilter';
import { fallbacks } from '$lib/data/fallbacks';
import { movies } from '$lib/data/movies';
import { shuffle, pickRandom } from '$lib/utils';
import type { Movie } from '$lib/types/index';

const FALLBACK_KEYS = Object.keys(fallbacks);
const GENERATION_BUDGET_MS = 8000;
const DESCRIPTION_CACHE_VERSION = 'v1';
const DESCRIPTION_CACHE_TTL_SECONDS = 60 * 60 * 24 * 7;
const pendingDescriptions = new Map<string, Promise<string | null>>();

function getDescriptionCacheKey(requestUrl: string, movie: Movie): Request {
	const cacheUrl = new URL(requestUrl);
	cacheUrl.pathname = `/__filmfumble/descriptions/${DESCRIPTION_CACHE_VERSION}/${encodeURIComponent(movie.title)}`;
	cacheUrl.search = new URLSearchParams({ year: String(movie.year) }).toString();
	cacheUrl.hash = '';
	return new Request(cacheUrl, { method: 'GET' });
}

async function getCachedDescription(
	cache: Cache,
	cacheKey: Request,
	movie: Movie
): Promise<string | null> {
	try {
		const response = await cache.match(cacheKey);
		if (!response?.ok) return null;

		const filtered = filterContent(await response.text(), movie.title);
		return filtered.safe ? filtered.filtered : null;
	} catch (err) {
		console.warn(`[round] description cache read failed for "${movie.title}":`, err);
		return null;
	}
}

function cacheDescription(
	cache: Cache,
	cacheKey: Request,
	description: string,
	ctx: ExecutionContext
) {
	const response = new Response(description, {
		headers: {
			'Cache-Control': `public, max-age=${DESCRIPTION_CACHE_TTL_SECONDS}`,
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});

	ctx.waitUntil(
		cache
			.put(cacheKey, response)
			.catch((err) => console.warn('[round] description cache write failed:', err))
	);
}

async function generateSafeDescription(movie: Movie, apiKey: string): Promise<string | null> {
	const generationDeadline = Date.now() + GENERATION_BUDGET_MS;
	for (let attempt = 0; attempt < 2; attempt++) {
		const remainingTime = generationDeadline - Date.now();
		if (remainingTime <= 0) break;

		try {
			const result = await generateDescription(movie.title, movie.year, apiKey, remainingTime);
			const filtered = filterContent(result.description, movie.title);
			if (filtered.safe) return filtered.filtered;
			console.warn(`[round] attempt ${attempt + 1}: content filtered for "${movie.title}"`);
		} catch (err) {
			console.error(`[round] attempt ${attempt + 1} OpenRouter error:`, err);
		}
	}

	return null;
}

function getPendingDescription(movie: Movie, apiKey: string): Promise<string | null> {
	const pendingKey = `${movie.title}\u0000${movie.year}`;
	const existing = pendingDescriptions.get(pendingKey);
	if (existing) return existing;

	const pending = generateSafeDescription(movie, apiKey).finally(() => {
		if (pendingDescriptions.get(pendingKey) === pending) {
			pendingDescriptions.delete(pendingKey);
		}
	});
	pendingDescriptions.set(pendingKey, pending);
	return pending;
}

function getFallbackForMovie(movieTitle: string): {
	description: string;
	usedFallbackMovie: string;
} {
	const fallbackDescription = fallbacks[movieTitle];
	if (fallbackDescription) {
		return { description: fallbackDescription, usedFallbackMovie: movieTitle };
	}

	const randomFallbackKey = pickRandom(FALLBACK_KEYS);
	return {
		description: fallbacks[randomFallbackKey],
		usedFallbackMovie: randomFallbackKey
	};
}

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: { usedMovieIds?: string[] };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (!Array.isArray(body.usedMovieIds)) {
		return json({ error: 'usedMovieIds must be an array' }, { status: 400 });
	}

	const usedIds = body.usedMovieIds ?? [];
	const apiKey = platform?.env?.OPENROUTER_API_KEY as string | undefined;
	const cache = platform?.caches?.default;

	let movie = pickMovie(usedIds);
	if (!movie) {
		return json(
			{ error: 'All movies have been used this session. Start a new game!' },
			{ status: 503 }
		);
	}

	let usedFallback = false;
	let description: string | null = null;
	const descriptionCacheKey = cache ? getDescriptionCacheKey(request.url, movie) : null;

	if (cache && descriptionCacheKey) {
		description = await getCachedDescription(cache, descriptionCacheKey, movie);
	}

	if (description === null && apiKey) {
		description = await getPendingDescription(movie, apiKey);
		if (description && cache && descriptionCacheKey && platform?.ctx) {
			cacheDescription(cache, descriptionCacheKey, description, platform.ctx);
		}
	}

	if (description === null) {
		const fallback = getFallbackForMovie(movie.title);
		description = fallback.description;
		usedFallback = true;

		if (fallback.usedFallbackMovie !== movie.title) {
			const rePickUsed = new Set([...usedIds, movie.title]);
			const swapTarget = movies.find(
				(m) => m.title === fallback.usedFallbackMovie && !rePickUsed.has(m.title)
			);
			if (swapTarget) {
				movie = swapTarget;
			}
		}
	}

	const decoys = pickDecoys(movie, 3);
	const options = shuffle([
		{ title: movie.title, posterPath: movie.posterPath ?? null },
		...decoys.map((d) => ({ title: d.title, posterPath: d.posterPath ?? null }))
	]);
	const correctIndex = options.findIndex((o) => o.title === movie.title);

	return json({
		description,
		options,
		correctIndex,
		movieId: movie.title,
		usedFallback
	});
};
