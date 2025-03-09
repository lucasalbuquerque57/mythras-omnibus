// schemas/character/skills/base.ts
import { z } from 'zod';

export const baseSkillSchema = z.object({
    baseValue: z.number().min(0).max(100),
    currentProficiency: z.number().min(0).max(200),
    isProficient: z.boolean(),
    isFumbled: z.boolean().default(false),
});