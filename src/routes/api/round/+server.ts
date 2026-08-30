import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	getClueForMovie,
	getPlayableMovies,
	isContentPresetId
} from '$lib/services/contentRepository';
import { pickDecoys, pickMovie } from '$lib/services/moviePicker';
import { shuffle } from '$lib/utils';

export const POST: RequestHandler = async ({ request }) => {
	let body: { usedMovieIds?: string[]; contentPreset?: unknown };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (
		!Array.isArray(body.usedMovieIds) ||
		!body.usedMovieIds.every((id) => typeof id === 'string')
	) {
		return json({ error: 'usedMovieIds must be an array of strings' }, { status: 400 });
	}
	if (body.contentPreset !== undefined && !isContentPresetId(body.contentPreset)) {
		return json({ error: 'contentPreset is not supported' }, { status: 400 });
	}

	const moviePool = getPlayableMovies(body.contentPreset ?? 'all');
	const movie = pickMovie(body.usedMovieIds, moviePool);
	if (!movie) {
		return json({ error: 'All curated movies have been used this session.' }, { status: 503 });
	}

	const clue = getClueForMovie(movie.id);
	if (!clue) {
		return json({ error: 'No reviewed clue is available for this movie.' }, { status: 503 });
	}

	const decoys = pickDecoys(movie, 3);
	const options = shuffle([
		{ title: movie.title, posterPath: movie.posterPath ?? null },
		...decoys.map((decoy) => ({
			title: decoy.title,
			posterPath: decoy.posterPath ?? null
		}))
	]);

	return json({
		clueId: clue.id,
		description: clue.text,
		options,
		correctIndex: options.findIndex((option) => option.title === movie.title),
		movieId: movie.id,
		contentSource: clue.source
	});
};
