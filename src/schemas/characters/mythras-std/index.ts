import { z } from 'zod';
import {
    MythrasStdCharacteristicType,
    MythrasStdAttributeType,
    MythrasStdHitLocationType,
    MythrasStdStandardSkillType,
    MythrasStdMagicSkillType,
    MythrasStdProfessionalSkillType,
} from '@prisma/client';
//import { SPECIES_CONFIG } from '@/lib/systems/mythras-std/species-config';



export const MythrasDataSchema = z.object({
    personal: z.object({
        name: z.string().min(3).max(40),
        player: z.string().min(3).max(40).optional(),
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
    skills: z.object({
        standard: z.array(
            z.object({
                name: z.nativeEnum(MythrasStdStandardSkillType),
                baseValue: z.number().int().positive(),
                currentProficiency: z.number().int().positive(),
                totalAddedPoints: z.number().int().nonnegative().optional(), // maybe it should not be optional
                culturePoints: z.number().int().positive().optional(),
                careerPoints: z.number().int().positive().optional(),
                bonusPoints: z.number().int().positive().optional(),
                isProficient: z.boolean(),
                isFumbled: z.boolean().optional(),
            }),
        ),
        magic: z.array(
            z.object({
                name: z.nativeEnum(MythrasStdMagicSkillType),
                baseValue: z.number().int().positive(),
                currentProficiency: z.number().int().positive(),
                totalAddedPoints: z.number().int().nonnegative().optional(), // maybe it should not be optional
                culturePoints: z.number().int().positive().optional(),
                careerPoints: z.number().int().positive().optional(),
                bonusPoints: z.number().int().positive().optional(),
                isProficient: z.boolean(),
                isFumbled: z.boolean().optional(),
                spellType: z.string().optional(),
            }),
        ),
        professional: z.array(
            z.object({
                name: z.nativeEnum(MythrasStdProfessionalSkillType),
                baseValue: z.number().int().positive(),
                currentProficiency: z.number().int().positive(),
                totalAddedPoints: z.number().int().nonnegative().optional(), // maybe it should not be optional
                culturePoints: z.number().int().positive().optional(),
                careerPoints: z.number().int().positive().optional(),
                bonusPoints: z.number().int().positive().optional(),
                isProficient: z.boolean(),
                isFumbled: z.boolean().optional(),
                specialty: z.string().optional(),
            }),
        ),
    }),
    passion: z.array(
        z.object({
            name: z.string().optional(),
            category: z.string().optional(),
            baseValue: z.number().int().positive().optional(),
            currentValue: z.number().int().positive().optional(),
            initialBoost: z.number().int().optional(),
        }),
    ),
});

export type MythrasCharacterData = z.infer<typeof MythrasDataSchema>;





// alternative validation, a way to have species specific characteristic validation
/*
characteristics: z.array(
    z.object({
        name: z.nativeEnum(MythrasStdCharacteristicType),
        original: z.number().refine((val, ctx) => {
            const formValues = ctx.parent.parent.parent as z.infer<typeof MythrasDataSchema>;
            const species = formValues.personal.species as keyof typeof SPECIES_CONFIG;
            const characteristicName = ctx.parent.name as MythrasStdCharacteristicType;

            if (!(species in SPECIES_CONFIG)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid species",
                });
                return false;
            }

            const config = SPECIES_CONFIG[species][characteristicName];
            return val >= config.min && val <= config.max;
        }, "Invalid value for species"),
        current: z.number().refine((val, ctx) => {
            const formValues = ctx.parent.parent.parent as z.infer<typeof MythrasDataSchema>;
            const species = formValues.personal.species as keyof typeof SPECIES_CONFIG;
            const characteristicName = ctx.parent.name as MythrasStdCharacteristicType;

            if (!(species in SPECIES_CONFIG)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid species",
                });
                return false;
            }

            const config = SPECIES_CONFIG[species][characteristicName];
            return val >= config.min && val <= config.max;
        }, "Invalid value for species"),
    }),
),*/
