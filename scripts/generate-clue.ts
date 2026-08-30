import { movies } from '../src/lib/data/movies.ts';
import { filterContent } from '../src/lib/services/contentFilter.ts';
import { generateDescription } from '../src/lib/services/openrouter.ts';

const movieId = process.argv[2];
const apiKey = process.env.OPENROUTER_API_KEY;

if (!movieId || !apiKey) {
	console.error('Usage: OPENROUTER_API_KEY=... npm run generate:clue -- <movie-id>');
	process.exit(1);
}

const movie = movies.find((candidate) => candidate.id === movieId);
if (!movie) {
	console.error(`Unknown movie ID: ${movieId}`);
	process.exit(1);
}

const generated = await generateDescription(movie.title, movie.year, apiKey);
const filtered = filterContent(generated.description, movie.title);

if (!filtered.safe) {
	console.error(`Generated clue needs another attempt: ${filtered.reason ?? 'content rejected'}`);
	process.exit(1);
}

console.log(
	JSON.stringify(
		{
			movieId: movie.id,
			text: filtered.filtered,
			source: 'ai-candidate',
			status: 'requires-review'
		},
		null,
		2
	)
);
