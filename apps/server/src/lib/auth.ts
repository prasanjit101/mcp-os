import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { apiKey, multiSession } from 'better-auth/plugins';
import { db } from '../db';
import * as schema from '../db/schema/auth';
import { env } from '../env';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: [env.CORS_ORIGIN || ''],
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [
		apiKey(),
		multiSession({
			maximumSessions: 2,
		}),
	],
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,
});

export type Session = typeof auth.$Infer.Session;
