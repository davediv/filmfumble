import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithElementRef<T> = {
	ref?: T | null;
} & T;

/** Fisher-Yates (Durstenfeld) shuffle — returns a new shuffled array. */
export function shuffle<T>(arr: T[]): T[] {
	const result = [...arr];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export function pickRandom<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}
