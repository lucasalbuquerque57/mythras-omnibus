// schemas/characters/mythras-std/character-creation.ts
import { z } from 'zod';
import { MythrasDataSchema } from './index';

// Base schema with common fields
export const MythrasCreationBaseSchema = z.object({
    userId: z.string().min(1),
    system: z.literal('MYTHRAS_STD'),
});

// Step-specific schemas
export const Step1Schema = MythrasDataSchema.pick({
    personal: true,
}).extend({
    personal: MythrasDataSchema.shape.personal.pick({
        name: true,
        gender: true,
        species: true,
        culture: true,
        homeland: true,
        career: true,
    }),
});

const Step2Schema = MythrasDataSchema.pick({
    characteristics: true,
    attributes: true,
    hitLocations: true,
}).partial();

const Step3Schema = MythrasDataSchema.pick({
    skills: true,
}).partial();

const Step4Schema = MythrasDataSchema.pick({
    passion: true,
}).optional();

// Combined progressive schema
export const MythrasCreationSchema = MythrasCreationBaseSchema.and(
    z.discriminatedUnion('step', [
        z.object({
            step: z.literal(1),
            data: Step1Schema,
        }),
        z.object({
            step: z.literal(2),
            data: Step2Schema,
        }),
        z.object({
            step: z.literal(3),
            data: Step3Schema,
        }),
        z.object({
            step: z.literal(4),
            data: Step4Schema,
        }),
    ]),
);



/*
import { z } from 'zod';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std/index';

export const MythrasCreationSchema = MythrasDataSchema.pick({
    personal: true,
}).extend({
    characteristics: z.array(z.any()).optional(),
    attributes: z.array(z.any()).optional(),
    hitLocations: z.array(z.any()).optional(),
    skills: z.object({}).optional(),
    passion: z.array(z.any()).optional(),
});*/
