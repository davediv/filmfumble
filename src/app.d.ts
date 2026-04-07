// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface Env {
	OPENROUTER_API_KEY: string;
}

declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
			caches: CacheStorage;
		}
	}
}

export {};
