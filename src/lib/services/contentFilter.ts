/**
 * Content safety filter for AI-generated descriptions.
 * Blocks unsafe content and validates description quality.
 */

const BLOCKLIST = new Set([
	// Slurs and offensive terms — simplified, common examples
	'nigger',
	'faggot',
	'kike',
	'chink',
	'spik',
	'wetback',
	// NSFW
	'fuck',
	'pussy',
	'dick',
	'cock',
	'cunt',
	'asshole',
	'bastard',
	'slut',
	'whore'
]);

// Normalize for comparison
function normalize(text: string): string {
	return text.toLowerCase().replace(/[^a-z]/g, '');
}

export interface FilterResult {
	safe: boolean;
	filtered: string;
	reason?: string;
}

/**
 * Validate and sanitize an AI-generated description.
 * Returns { safe, filtered } — if safe=false, caller should use fallback.
 */
export function filterContent(text: string, movieTitle?: string): FilterResult {
	let filtered = text.trim();

	// Length check: truncate at last sentence boundary if > 180 chars
	if (filtered.length > 180) {
		const lastPeriod = filtered.lastIndexOf('.');
		const lastQuestion = filtered.lastIndexOf('?');
		const lastExclaim = filtered.lastIndexOf('!');
		const cutoff = Math.max(lastPeriod, lastQuestion, lastExclaim);
		if (cutoff > 60) {
			filtered = filtered.slice(0, cutoff + 1);
		} else {
			filtered = filtered.slice(0, 180);
		}
	}

	// Blocklist check
	const words = filtered.split(/\s+/);
	for (const word of words) {
		const normalized = normalize(word);
		if (BLOCKLIST.has(normalized)) {
			return { safe: false, filtered, reason: 'blocked term detected' };
		}
	}

	// Movie title leak check
	if (movieTitle) {
		const titleWords = movieTitle.toLowerCase().split(/\s+/);
		for (const word of titleWords) {
			// Only check words longer than 2 chars to avoid false positives
			if (word.length > 2 && normalize(filtered).includes(word)) {
				return { safe: false, filtered, reason: 'movie title detected in description' };
			}
		}
	}

	return { safe: true, filtered };
}
