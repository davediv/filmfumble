/**
 * POST /api/round — generates a new game round.
 *
 * Request body: { usedMovieIds: string[] }
 * Response:     { description, options: string[], correctIndex: number, movieId: string, usedFallback: boolean }
 *
 * Errors:
 * - 400: missing usedMovieIds
 * - 503: all movies exhausted
 * - 500: internal error
 */

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { pickMovie, pickDecoys } from '$lib/services/moviePicker';
import { generateDescription } from '$lib/services/openrouter';
import { filterContent } from '$lib/services/contentFilter';
import { fallbacks } from '$lib/data/fallbacks';
import { movies } from '$lib/data/movies';

const FALLBACK_KEYS = Object.keys(fallbacks);

/**
 * Get a fallback description for a movie.
 * If the movie has a specific fallback, use it.
 * Otherwise pick a random fallback from the bank.
 * Returns { description, usedFallbackMovie } where usedFallbackMovie is the movie key used.
 */
function getFallbackForMovie(movieTitle: string): {
	description: string;
	usedFallbackMovie: string;
} {
	const fallbackDescription = fallbacks[movieTitle];
	if (fallbackDescription) {
		return { description: fallbackDescription, usedFallbackMovie: movieTitle };
	}

	// No specific fallback — pick a random one and re-pick a movie that has one
	const randomFallbackKey = FALLBACK_KEYS[Math.floor(Math.random() * FALLBACK_KEYS.length)];
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
		// Try once; on failure, retry once with the same movie
		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				const result = await generateDescription(movie.title, movie.year, apiKey);
				const filtered = filterContent(result.description, movie.title);
				if (filtered.safe) {
					description = filtered.filtered;
					break;
				}
				// Content filtered — treat as failure, retry
				console.warn(`[round] attempt ${attempt + 1}: content filtered for "${movie.title}"`);
			} catch (err) {
				console.error(`[round] attempt ${attempt + 1} OpenRouter error:`, err);
			}

			// If first attempt failed, retry once
			if (attempt === 0) {
				// Retry — no re-pick needed, same movie
				continue;
			}
		}
	}

	// Use fallback if AI failed or no API key
	if (description === null) {
		const fallback = getFallbackForMovie(movie.title);
		description = fallback.description;
		usedFallback = true;

		// If the fallback movie key doesn't match our picked movie,
		// it means we picked a random fallback — need to re-pick a movie that has this fallback
		if (fallback.usedFallbackMovie !== movie.title) {
			// Re-pick to ensure the fallback description is for a movie actually in the options
			const fallbackMovieTitle = fallback.usedFallbackMovie;
			const rePickUsedIds = [...usedIds, movie.title];

			// Try to find a movie that matches the fallback's genre/era as a bonus,
			// but we just need any unused movie that has this fallback
			const fallbackMovieOptions = movies.filter((m) => !rePickUsedIds.includes(m.title));
			const newMovie =
				fallbackMovieOptions.find((m) => m.title === fallbackMovieTitle) ??
				fallbackMovieOptions[0] ??
				pickMovie(rePickUsedIds);

			if (newMovie) {
				movie = newMovie;
			}
		}
	}

	// Select 3 decoys
	const decoys = pickDecoys(movie, 3);

	// Build options array — correct answer + 3 decoys
	const options = [movie.title, ...decoys.map((d) => d.title)];

	// Shuffle so correct answer is at a random position (Durstenfeld)
	for (let i = options.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[options[i], options[j]] = [options[j], options[i]];
	}

	const correctIndex = options.indexOf(movie.title);

	return json({
		description,
		options,
		correctIndex,
		movieId: movie.title,
		usedFallback
	});
};
