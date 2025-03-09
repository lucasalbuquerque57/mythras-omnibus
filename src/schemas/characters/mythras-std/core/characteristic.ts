// schemas/character/base/characteristic.ts
import { z } from 'zod';
import { CHARACTERISTICS } from '@/lib/characters/mythras/contants/constants';

export const characteristicSchema = z.object({
    characteristic: z.enum(CHARACTERISTICS),
    original: z.string().min(0).max(50),
    current: z.string().min(0).max(50),
});