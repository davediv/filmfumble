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

function normalize(text: string): string {
	return text.toLowerCase().replace(/[^a-z]/g, '');
}

export interface FilterResult {
	safe: boolean;
	filtered: string;
	reason?: string;
}

export function filterContent(text: string, movieTitle?: string): FilterResult {
	let filtered = text.trim();

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

	const words = filtered.split(/\s+/);
	for (const word of words) {
		const normalized = normalize(word);
		if (BLOCKLIST.has(normalized)) {
			return { safe: false, filtered, reason: 'blocked term detected' };
		}
	}

	if (movieTitle) {
		const titleWords = movieTitle.toLowerCase().split(/\s+/);
		const descWords = filtered
			.toLowerCase()
			.split(/\s+/)
			.map((w) => w.replace(/[^a-z]/g, ''));
		for (const word of titleWords) {
			if (word.length > 3 && descWords.includes(word)) {
				return { safe: false, filtered, reason: 'movie title detected in description' };
			}
		}
	}

	return { safe: true, filtered };
}
