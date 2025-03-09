// schemas/character/hitLocation/changeLog.ts
import { z } from 'zod';

export const changeLogSchema = z.object({
    value: z.number(),
    timestamp: z.date(),
    reason: z.string().min(3).max(40),
});