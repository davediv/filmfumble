import type { ContentPresetId } from '../types/index.ts';

export interface ContentPresetOption {
	id: ContentPresetId;
	label: string;
	description: string;
	availableMovies: number;
}

export interface RoundLimitOption {
	value: number | null;
	label: string;
}

export const CONTENT_PRESETS: ContentPresetOption[] = [
	{
		id: 'all',
		label: 'Mixed favorites',
		description: 'A balanced mix of familiar films and tougher picks.',
		availableMovies: 22
	},
	{
		id: 'casual',
		label: 'Crowd pleasers',
		description: 'The most widely recognizable movies in the collection.',
		availableMovies: 12
	},
	{
		id: 'challenging',
		label: 'Deep cuts',
		description: 'Harder titles for players who know their movies.',
		availableMovies: 10
	},
	{
		id: 'classic',
		label: 'Before 2000',
		description: 'Curated favorites released before the year 2000.',
		availableMovies: 14
	},
	{
		id: 'modern',
		label: '2000 and later',
		description: 'Modern favorites released from 2000 onward.',
		availableMovies: 8
	},
	{
		id: 'action',
		label: 'Action',
		description: 'Action-heavy movies with closely matched decoys.',
		availableMovies: 7
	},
	{
		id: 'crime',
		label: 'Crime',
		description: 'Gangsters, detectives, and morally questionable decisions.',
		availableMovies: 8
	},
	{
		id: 'drama',
		label: 'Drama',
		description: 'Serious movies described with very little dignity.',
		availableMovies: 12
	},
	{
		id: 'science-fiction',
		label: 'Science fiction',
		description: 'Space, simulations, time travel, and bad explanations.',
		availableMovies: 6
	}
];

export function getContentPreset(id: ContentPresetId): ContentPresetOption {
	return CONTENT_PRESETS.find((preset) => preset.id === id) ?? CONTENT_PRESETS[0];
}

export function getRoundLimitOptions(contentPreset: ContentPresetId): RoundLimitOption[] {
	const { availableMovies } = getContentPreset(contentPreset);
	const finiteOptions = [5, 10, 20]
		.filter((rounds) => rounds <= availableMovies)
		.map((rounds) => ({ value: rounds, label: `${rounds} rounds` }));

	return [...finiteOptions, { value: null, label: 'Endless' }];
}

export function getDefaultRoundLimit(contentPreset: ContentPresetId): number {
	const finiteOptions = getRoundLimitOptions(contentPreset).filter(
		(option): option is RoundLimitOption & { value: number } => option.value !== null
	);
	return finiteOptions.find((option) => option.value === 10)?.value ?? finiteOptions[0]?.value ?? 1;
}
