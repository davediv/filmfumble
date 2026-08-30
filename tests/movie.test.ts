import assert from 'node:assert/strict';
import test from 'node:test';
import { movies } from '../src/lib/data/movies.ts';
import { createMovieId } from '../src/lib/domain/movie.ts';

test('movie IDs are deterministic and distinguish release years', () => {
	assert.equal(createMovieId('Bāhubali: The Epic', 2025), 'bahubali-the-epic-2025');
	assert.notEqual(createMovieId('Dune', 1984), createMovieId('Dune', 2021));
});

test('the movie catalog has unique stable IDs', () => {
	const ids = movies.map((movie) => movie.id);
	assert.equal(new Set(ids).size, ids.length);
});
