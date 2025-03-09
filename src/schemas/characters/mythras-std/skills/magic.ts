// schemas/character/skills/magic.ts
import { z } from 'zod';
import { baseSkillSchema } from '@/schemas/characters/mythras-std/skills/base';
import { MAGIC_SKILLS } from '@/lib/characters/mythras/contants/constants';

export const magicSkillSchema = baseSkillSchema.extend({
    name: z.enum(MAGIC_SKILLS),
    type: z.literal('magic'),
    spellType: z.enum(['Theism', 'Sorcery', 'Folk Magic', 'Mysticism', 'Animism']),
});