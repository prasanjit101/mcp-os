import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { apikey } from '@/db/schema/auth';
import { apiKeyInsertSchema, apiKeyUpdateSchema } from '@/db/types';
import { auth } from '../lib/auth';
import { publicProcedure, router } from '../lib/trpc';

export const apiKeyRouter = router({
	create: publicProcedure
		.input(apiKeyInsertSchema.omit({ createdAt: true, updatedAt: true }))
		.mutation(async ({ input, ctx }) => {
			try {
				const headers = ctx.headers;
				return await auth.api.createApiKey({
					headers,
					body: {
						name: input.name ?? 'new-key',
						prefix: 'mcps-',
						remaining: 50,
						refillAmount: 200, // 200 requests for the refill interval
						refillInterval: 60 * 60 * 24 * 30, // 30 days
						rateLimitTimeWindow: 1000 * 60 * 60 * 24, // 1 day
						rateLimitMax: 200, // every day, they can use up to 200 requests
						rateLimitEnabled: true,
						userId: ctx.session?.user.id ?? '',
					},
				});
			} catch (error) {
				console.error(error);
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: 'Failed to create API key',
				});
			}
		}),

	get: publicProcedure
		.input(z.object({ keyId: z.string() }))
		.query(async ({ input }) => {
			return await auth.api.getApiKey({ query: { id: input.keyId } });
		}),

	update: publicProcedure
		.input(apiKeyUpdateSchema.omit({ createdAt: true, updatedAt: true }))
		.mutation(async ({ input }) => {
			return await auth.api.updateApiKey({
				body: {
					keyId: input.id ?? '',
					name: input.name ?? '',
					enabled: input.enabled ?? false,
				},
			});
		}),

	delete: publicProcedure
		.input(z.object({ keyId: z.string() }))
		.mutation(async ({ input }) => {
			return await db.delete(apikey).where(eq(apikey.id, input.keyId));
		}),

	list: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ input, ctx }) => {
			try {
				const headers = ctx.headers;
				return await auth.api.listApiKeys({
					headers,
					query: { userId: input.userId },
				});
			} catch (error) {
				console.error(error);
				return [];
			}
		}),
});
