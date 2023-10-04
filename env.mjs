import {createEnv} from '@t3-oss/env-nextjs'
import {z} from 'zod'

export const env = createEnv({
	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		GATHER_BEARER_TOKEN: process.env.GATHER_BEARER_TOKEN,
		GATHER_SPACE_ID: process.env.GATHER_SPACE_ID,
		KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
		KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
		KV_REST_API_URL: process.env.KV_REST_API_URL,
		KV_URL: process.env.KV_URL,
		SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
		SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID
	},

	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		GATHER_BEARER_TOKEN: z.string(),
		GATHER_SPACE_ID: z.string(),
		KV_REST_API_READ_ONLY_TOKEN: z.string(),
		KV_REST_API_TOKEN: z.string(),
		KV_REST_API_URL: z.string(),
		KV_URL: z.string(),
		SLACK_BOT_TOKEN: z.string(),
		SLACK_CHANNEL_ID: z.string()
	}
})
