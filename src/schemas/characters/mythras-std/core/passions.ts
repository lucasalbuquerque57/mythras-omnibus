// schemas/character/base/characteristic.ts
import { z } from 'zod';

export const passionsSchema = z.object({
    name: z.string().min(3),
    relationship: z.string().min(3),
    value: z.number().min(1).max(100),
});