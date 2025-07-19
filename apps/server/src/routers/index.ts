import {
  protectedProcedure, publicProcedure,
  router,
} from "../lib/trpc";
import { apiKeyRouter } from './apiKey';

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return 'OK';
	}),
	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: 'This is private',
			user: ctx.session.user,
		};
	}),
	apiKey: apiKeyRouter,
});
export type AppRouter = typeof appRouter;
