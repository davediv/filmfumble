#!/usr/bin/env npx tsx

/**
 * FilmFumble Movie Seed Script
 *
 * Fetches top-rated and popular movies from TMDB API and generates
 * the curated movie pool at src/lib/data/movies.ts
 *
 * Usage:
 *   TMDB_API_KEY=your_api_key_here npx tsx scripts/seed-movies.ts
 *
 * Prerequisites:
 *   - TMDB API key (free at https://www.themoviedb.org/settings/api)
 */

import { writeFile } from 'node:fs/promises';

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
	console.error('Error: TMDB_API_KEY environment variable is required.');
	console.error('Get a free API key at https://www.themoviedb.org/settings/api');
	process.exit(1);
}

interface TmdbMovie {
	id: number;
	title: string;
	release_date: string;
	vote_average: number;
	genre_ids: number[];
	poster_path: string | null;
}

interface TmdbGenre {
	id: number;
	name: string;
}

const GENRE_MAP: Record<number, string> = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Sci-Fi',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western'
};

async function fetchTmdb<T>(path: string): Promise<T> {
	const url = `${TMDB_BASE}${path}&api_key=${API_KEY}&language=en-US&include_adult=false`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`TMDB API error: ${res.status} ${res.statusText} for ${url}`);
	}
	return res.json() as Promise<T>;
}

async function fetchGenres(): Promise<Map<number, string>> {
	console.log('Fetching genre list from TMDB...');
	const data = await fetchTmdb<{ genres: TmdbGenre[] }>('/genre/movie/list?');
	const map = new Map<number, string>();
	for (const g of data.genres) {
		map.set(g.id, g.name);
		if (g.id in GENRE_MAP) {
			// Ensure consistency with our genre map
		}
	}
	return map;
}

interface FetchedMovie {
	title: string;
	year: number;
	genres: string[];
	imdbRating: number;
	posterUrl: string | null;
}

async function fetchMoviesFromEndpoint(
	endpoint: string,
	genreMap: Map<number, string>,
	maxPages = 5
): Promise<FetchedMovie[]> {
	const allMovies: FetchedMovie[] = [];

	for (let page = 1; page <= maxPages; page++) {
		console.log(`  Fetching ${endpoint} page ${page}...`);
		const data = await fetchTmdb<{ results: TmdbMovie[] }>(
			`/movie/${endpoint}?page=${page}&vote_count.gte=100`
		);

		for (const m of data.results) {
			if (m.vote_average < 6.0) continue;
			if (!m.release_date || m.release_date.length < 4) continue;

			const year = parseInt(m.release_date.slice(0, 4), 10);
			const genres = m.genre_ids
				.map((id) => genreMap.get(id) ?? GENRE_MAP[id] ?? null)
				.filter((g): g is string => g !== null);

			allMovies.push({
				title: m.title,
				year,
				genres,
				imdbRating: Math.round(m.vote_average * 10) / 10,
				posterUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null
			});
		}

		if (data.results.length === 0) break;
	}

	return allMovies;
}

function deduplicateByTitle(movies: FetchedMovie[]): FetchedMovie[] {
	const seen = new Map<string, FetchedMovie>();
	for (const m of movies) {
		const key = m.title.toLowerCase().trim();
		if (!seen.has(key)) {
			seen.set(key, m);
		}
	}
	return Array.from(seen.values());
}

function generateMoviesTs(movies: FetchedMovie[]): string {
	const lines: string[] = [
		"import type { Movie } from '../types/index.ts';",
		'',
		'export const movies: Movie[] = ['
	];

	// Group by primary genre for organization
	const byGenre = new Map<string, FetchedMovie[]>();
	for (const m of movies) {
		const primary = m.genres[0] ?? 'Drama';
		if (!byGenre.has(primary)) byGenre.set(primary, []);
		byGenre.get(primary)!.push(m);
	}

	// Sort genres in a consistent order
	const genreOrder = [
		'Action',
		'Adventure',
		'Animation',
		'Comedy',
		'Crime',
		'Drama',
		'Horror',
		'Romance',
		'Sci-Fi',
		'Thriller'
	];

	const sortedGenres = genreOrder.filter((g) => byGenre.has(g));
	for (const genre of sortedGenres) {
		const genreMovies = byGenre.get(genre)!;
		// Sort by rating descending
		genreMovies.sort((a, b) => b.imdbRating - a.imdbRating);

		lines.push(`\t// ${genre}`);
		for (const m of genreMovies) {
			const poster = m.posterUrl ? `, posterUrl: '${m.posterUrl}'` : '';
			lines.push(
				`\t{ title: '${escapeString(m.title)}', year: ${m.year}, genres: [${m.genres.map((g) => `'${g}'`).join(', ')}], imdbRating: ${m.imdbRating}${poster} },`
			);
		}
		lines.push('');
	}

	// Add any movies with genres not in our ordered list
	const otherMovies = movies.filter((m) => !genreOrder.includes(m.genres[0] ?? ''));
	if (otherMovies.length > 0) {
		lines.push('\t// Other');
		for (const m of otherMovies) {
			const poster = m.posterUrl ? `, posterUrl: '${m.posterUrl}'` : '';
			lines.push(
				`\t{ title: '${escapeString(m.title)}', year: ${m.year}, genres: [${m.genres.map((g) => `'${g}'`).join(', ')}], imdbRating: ${m.imdbRating}${poster} },`
			);
		}
	}

	lines.push('];');
	return lines.join('\n');
}

function escapeString(s: string): string {
	// Escape single quotes and backslashes for single-quoted JS strings
	return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function main() {
	console.log('FilmFumble Movie Seed Script');
	console.log('============================\n');

	const genreMap = await fetchGenres();
	console.log('');

	console.log('Fetching movies from TMDB endpoints...');
	const [topRated, popular] = await Promise.all([
		fetchMoviesFromEndpoint('top_rated', genreMap, 5),
		fetchMoviesFromEndpoint('popular', genreMap, 5)
	]);

	console.log(`\nFetched ${topRated.length} top-rated, ${popular.length} popular`);

	// Combine and deduplicate
	const combined = [...topRated, ...popular];
	console.log(`Combined: ${combined.length} movies before dedup`);

	const deduped = deduplicateByTitle(combined);
	deduped.sort((a, b) => b.imdbRating - a.imdbRating);
	console.log(`After dedup: ${deduped.length} unique movies`);

	if (deduped.length < 200) {
		console.warn(`Warning: Only ${deduped.length} movies fetched (target: 200+)`);
	}

	// Generate TypeScript
	const output = generateMoviesTs(deduped);

	// Write to movies.ts
	const outputPath = 'src/lib/data/movies.ts';
	await writeFile(outputPath, output, 'utf-8');

	console.log(`\nWrote ${deduped.length} movies to ${outputPath}`);
	console.log('\nDone!');
}

main().catch((err) => {
	console.error('Script failed:', err);
	process.exit(1);
});
