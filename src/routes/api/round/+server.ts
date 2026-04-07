import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pickMovie, pickDecoys } from '$lib/services/moviePicker';
import { generateDescription } from '$lib/services/openrouter';
import { filterContent } from '$lib/services/contentFilter';
import { fallbacks } from '$lib/data/fallbacks';
import { movies } from '$lib/data/movies';
import { shuffle, pickRandom } from '$lib/utils';

const FALLBACK_KEYS = Object.keys(fallbacks);

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

	let movie = pickMovie(usedIds);
	if (!movie) {
		return json(
			{ error: 'All movies have been used this session. Start a new game!' },
			{ status: 503 }
		);
	}

	let usedFallback = false;
	let description: string | null = null;

	if (apiKey) {
		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				const result = await generateDescription(movie.title, movie.year, apiKey);
				const filtered = filterContent(result.description, movie.title);
				if (filtered.safe) {
					description = filtered.filtered;
					break;
				}
				console.warn(`[round] attempt ${attempt + 1}: content filtered for "${movie.title}"`);
			} catch (err) {
				console.error(`[round] attempt ${attempt + 1} OpenRouter error:`, err);
			}
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
	const options = shuffle([movie.title, ...decoys.map((d) => d.title)]);
	const correctIndex = options.indexOf(movie.title);

	return json({
		description,
		options,
		correctIndex,
		movieId: movie.title,
		usedFallback
	});
};
