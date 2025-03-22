// lib/characters/mythras/types.ts
import { z } from 'zod';
import { personalInfoSchema } from '@/schemas/characters/mythras-std/core/personal-info';
import { characteristicSchema } from '@/schemas/characters/mythras-std/core/characteristic';
import { attributeSchema } from '@/schemas/characters/mythras-std/core/attribute';
import { hitLocationSchema } from '@/schemas/characters/mythras-std/hitLocation/hit-location';
import { standardSkillSchema } from '@/schemas/characters/mythras-std/skills/standard';
import { professionalSkillSchema } from '@/schemas/characters/mythras-std/skills/professional';
import { magicSkillSchema } from '@/schemas/characters/mythras-std/skills/magic';

export type MythrasCharacter = z.infer<typeof mythrasCharacterSchema>;

export const mythrasCharacterSchema = z.object({
    base: z.object({
        info: personalInfoSchema,
        characteristics: z.array(characteristicSchema),
        attributes: z.array(attributeSchema),
    }),
    skills: z.object({
        standard: z.array(standardSkillSchema),
        professional: z.array(professionalSkillSchema),
        magic: z.array(magicSkillSchema),
    }),
    combat: z.object({
        hitLocations: z.array(hitLocationSchema),
    }),
});