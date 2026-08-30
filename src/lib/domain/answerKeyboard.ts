const LETTER_KEYS = ['a', 'b', 'c', 'd'];

export function answerIndexForKey(key: string, optionCount: number): number | null {
	const normalizedKey = key.toLowerCase();
	const letterIndex = LETTER_KEYS.indexOf(normalizedKey);
	const numberIndex = /^[1-4]$/.test(normalizedKey) ? Number(normalizedKey) - 1 : -1;
	const answerIndex = letterIndex >= 0 ? letterIndex : numberIndex;

	return answerIndex >= 0 && answerIndex < optionCount ? answerIndex : null;
}
