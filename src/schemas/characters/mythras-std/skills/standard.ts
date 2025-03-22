// schemas/character/skills/standard.ts
import { z } from 'zod';
import { baseSkillSchema } from '@/schemas/characters/mythras-std/skills/base';
import { STANDARD_SKILLS } from '@/types/characters/mythras/contants/constants';

export const standardSkillSchema = baseSkillSchema.extend({
    name: z.enum(STANDARD_SKILLS),
    type: z.literal('standard'),
});