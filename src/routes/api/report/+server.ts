import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { parseClueReport } from '$lib/services/clueReports';

export const POST: RequestHandler = async ({ request }) => {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const report = parseClueReport(body);
	if (!report) {
		return json({ error: 'Invalid clue report' }, { status: 400 });
	}

	console.warn(
		JSON.stringify({
			event: 'clue_report',
			...report,
			reportedAt: new Date().toISOString()
		})
	);

	return json({ accepted: true }, { status: 202 });
};
