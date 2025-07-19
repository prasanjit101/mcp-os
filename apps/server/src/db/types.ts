import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from 'drizzle-zod';
import { apikey } from './schema/auth';

export const apiKeySelectSchema = createSelectSchema(apikey);
export const apiKeyInsertSchema = createInsertSchema(apikey);
export const apiKeyUpdateSchema = createUpdateSchema(apikey);
