export type ShareOutcome = 'shared' | 'copied' | 'cancelled' | 'unavailable';

export interface ResultsShareAdapter {
	share?: (data: { title: string; text: string }) => Promise<void>;
	copy?: (text: string) => Promise<void>;
}

function isAbortError(error: unknown): boolean {
	return (
		typeof error === 'object' && error !== null && 'name' in error && error.name === 'AbortError'
	);
}

export async function shareResultsText(
	text: string,
	adapter: ResultsShareAdapter
): Promise<ShareOutcome> {
	if (adapter.share) {
		try {
			await adapter.share({ title: 'My FilmFumble result', text });
			return 'shared';
		} catch (error) {
			if (isAbortError(error)) return 'cancelled';
		}
	}

	if (adapter.copy) {
		try {
			await adapter.copy(text);
			return 'copied';
		} catch {
			// The caller reveals selectable text when platform sharing is unavailable.
		}
	}

	return 'unavailable';
}
