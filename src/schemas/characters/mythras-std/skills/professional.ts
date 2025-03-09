// schemas/character/skills/professional.ts
import { z } from 'zod';
import { baseSkillSchema } from './base';
import { PROFESSIONAL_SKILLS, PROFESSIONAL_SKILLS_ANY } from '@/lib/characters/mythras/contants/constants';

export const professionalSkillSchema = baseSkillSchema.extend({
    category: z.union([
        z.enum([...PROFESSIONAL_SKILLS, ...PROFESSIONAL_SKILLS_ANY]),
        z.string().min(3),
    ]),
    type: z.literal('professional'),
    specialization: z.string().min(3).optional(),
});


/*
This stuff is important for the prisma schema to have multiple entries of skills with the Any tag
// schemas/character/skills/professional.ts
export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.enum([...PROFESSIONAL_SKILLS, ...PROFESSIONAL_SKILLS_ANY]),
    type: z.literal('professional'),
    specialty: z.string().max(30).optional()
}).superRefine((data, ctx) => {
    const anySkills = PROFESSIONAL_SKILLS_ANY as readonly string[];
    if (anySkills.includes(data.name)) {
        if (!data.specialty?.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `${data.name} requires a specialty`,
                path: ["specialty"]
            });
        }
        // Enforce unique specialty format
        if (!/^[A-Z][a-zA-Z ]+$/.test(data.specialty)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Specialty must be properly capitalized",
                path: ["specialty"]
            });
        }
    } else {
        // Clear specialty for non-Any skills
        data.specialty = undefined;
    }
});
*/
