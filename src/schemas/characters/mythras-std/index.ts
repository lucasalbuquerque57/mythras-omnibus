import { z } from 'zod';
import {
    MythrasStdCharacteristicType,
    MythrasStdAttributeType,
    MythrasStdHitLocationType,
} from '@prisma/client';
import {
    combatStyleSchema,
    magicSkillSchema, passionSchema,
    professionalSkillSchema,
    standardSkillSchema,
} from "@/schemas/characters/mythras-std/skills";

/* MAIN STUFF */

export const MythrasDataSchema = z.object({
    personal: z.object({
        name: z.string().min(3).max(40),
        player: z.string().min(3),
        nickname: z.string().max(40).optional(),
        age: z.string().optional(),
        gender: z.string().min(1).max(11),
        //communal
        species: z.string().min(3).max(20),
        culture: z.string().min(3).max(20),
        homeland: z.string().min(3).max(20),
        religion: z.string().min(3).max(20).optional(),
        deity: z.string().min(3).max(30).optional(),
        socialClass: z.string().max(15).optional(),
        lord: z.string().min(3).max(30).optional(),
        //life choices
        career: z.string().min(3).max(20),
        faction: z.string().min(3).max(20).optional(),
        //physical
        handedness: z.string().max(10).optional(),
        frame: z.string().min(3).max(10).optional(),
        height: z.string().min(3).max(5).optional(),
        weight: z.string().min(3).max(5).optional(),
    }),
    characteristics: z.array(
        z.object({
            name: z.nativeEnum(MythrasStdCharacteristicType),
            original: z.number().int().positive(),
            current: z.number().int().positive(),
        }),
    ),
    attributes: z.array(
        z.object({
            name: z.nativeEnum(MythrasStdAttributeType),
            original: z.string().min(0).max(50),
            current: z.string().min(0).max(50),
        }),
    ),
    hitLocations: z.array(
        z.object({
            location: z.nativeEnum(MythrasStdHitLocationType),
            armor: z.string().optional(),
            hp: z.number().int(),
            ap: z.number().int(),
            hpHistory: z.array(
                z.object({
                    date: z.date(),
                    change: z.number().int(),
                    reason: z.string(),
                }),
            ).optional(),
            apHistory: z.array(
                z.object({
                    date: z.date(),
                    change: z.number().int(),
                    reason: z.string(),
                }),
            ).optional(),
        }),
    ),
    standardSkills: z.array(standardSkillSchema),
    magicSkills: z.array(magicSkillSchema).optional(),
    professionalSkills: z.array(professionalSkillSchema),
    combatStyles: z.array(combatStyleSchema),
    passions: z.array(passionSchema).optional(),
});


export type MythrasCharacterData = z.infer<typeof MythrasDataSchema>;