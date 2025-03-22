// schemas/character/base/attribute.ts
import { z } from 'zod';
import { ATTRIBUTES } from '@/types/characters/mythras/contants/constants';

export const attributeSchema = z.object({
    attribute: z.enum(ATTRIBUTES),
    original: z.string().min(0).max(50),
    current: z.string().min(0).max(50),
});