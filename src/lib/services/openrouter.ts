interface OpenRouterResponse {
	choices: Array<{
		message: {
			content: string;
		};
	}>;
}

export interface GenerationResult {
	description: string;
	fromFallback: false;
}

export async function generateDescription(
	movieTitle: string,
	year: number,
	apiKey: string
): Promise<GenerationResult> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);

	try {
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			signal: controller.signal,
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
				'HTTP-Referer': 'https://filmfumble.pages.dev',
				'X-Title': 'FilmFumble'
			},
			body: JSON.stringify({
				model: 'openrouter/free',
				messages: [
					{
						role: 'system',
						content: `You are a comedian who describes movies badly. Given a movie title, write a single, short, funny, intentionally terrible description of its plot.
Rules:
- Maximum 2 sentences, under 180 characters.
- Do NOT mention the movie title, character names, or actor names.
- Do NOT include spoilers about the ending.
- Be absurd, reductive, or deliberately misleading — but the description must still be technically accurate to the plot.
- Keep it PG-13. No slurs, no NSFW content.`
					},
					{
						role: 'user',
						content: `${movieTitle} (${year})`
					}
				],
				max_tokens: 80,
				temperature: 0.9
			})
		});

		clearTimeout(timeout);

		if (!response.ok) {
			throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
		}

		const data = (await response.json()) as OpenRouterResponse;
		const content = data.choices[0]?.message?.content?.trim();

		if (!content) {
			throw new Error('Empty response from OpenRouter');
		}

		return { description: content, fromFallback: false };
	} catch (err) {
		clearTimeout(timeout);
		throw err;
	}
}
