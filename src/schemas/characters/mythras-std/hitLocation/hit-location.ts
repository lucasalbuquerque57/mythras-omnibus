// schemas/character/hitLocation/hitLocation.ts
import { z } from 'zod';
import { changeLogSchema } from '@/schemas/characters/mythras-std/hitLocation/change-log';
import { HIT_LOCATIONS } from '@/types/characters/mythras/contants/constants';

export const hitLocationSchema = z.object({
    location: z.enum(HIT_LOCATIONS),
    armor: z.string().optional(),
    hp: z.number().min(0).max(100),
    hpHistory: z.array(changeLogSchema),
    ap: z.number().min(0).max(50),
    apHistory: z.array(changeLogSchema),
});