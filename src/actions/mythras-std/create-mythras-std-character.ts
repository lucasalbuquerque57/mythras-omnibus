// actions/create-mythras-character.ts
'use server';

import { db } from '@/lib/db';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import { z } from 'zod';

export const createMythrasStdCharacter = async (
    values: z.infer<typeof MythrasDataSchema>,
    characterId?: string,
) => {
    const validation = MythrasDataSchema.safeParse(values);
    if (!validation.success) return { error: 'Invalid data' };

    try {
        const result = await db.$transaction(async (prisma) => {
            if (!validation.data.personal.player) {
                throw new Error('Player ID is required');
            }

            // Base character update/create
            const baseCharacter = characterId
                ? await prisma.character.update({
                    where: { id: characterId },
                    data: {
                        name: validation.data.personal.name,
                        status: 'DRAFT',
                    },
                })
                : await prisma.character.create({
                    data: {
                        name: validation.data.personal.name,
                        userId: validation.data.personal.player,
                        system: 'MYTHRAS_STD',
                        player: validation.data.personal.player,
                        status: 'DRAFT',
                    },
                });


            const mythrasData = {
                personal: {
                    create: {
                            // Required fields with validation
                            name: validation.data.personal.name,
                            player: validation.data.personal.player,
                            gender: validation.data.personal.gender,
                            species: validation.data.personal.species,
                            culture: validation.data.personal.culture,
                            homeland: validation.data.personal.homeland,
                            career: validation.data.personal.career,
                            // Numeric field with validation
                            age: parseInt(validation.data.personal.age || '20'),
                            // Optional fields
                            nickname: validation.data.personal.nickname ?? undefined,
                            religion: validation.data.personal.religion ?? undefined,
                            deity: validation.data.personal.deity ?? undefined,
                            socialClass: validation.data.personal.socialClass ?? undefined,
                            lord: validation.data.personal.lord ?? undefined,
                            faction: validation.data.personal.faction ?? undefined,
                            handedness: validation.data.personal.handedness ?? 'Right',
                            frame: validation.data.personal.frame ?? 'Average',
                            height: validation.data.personal.height ?? '170cm',
                            weight: validation.data.personal.weight ?? '70kg',
                        },
                    },
                    characteristics: {
                        create: validation.data.characteristics.map(c => ({
                            name: c.name,
                            original: c.original.toString(),
                            current: c.current.toString(),
                        })),
                    },
                    attributes: {
                        create: validation.data.attributes.map(a => ({
                            name: a.name,
                            original: a.original,
                            current: a.current,
                        })),
                    },
                    hitLocations: {
                        create: validation.data.hitLocations.map(hl => ({
                            location: hl.location,
                            armor: hl.armor || '',
                            hp: hl.hp,
                            ap: hl.ap || 0,
                            hpHistory: hl.hpHistory || [],
                            apHistory: hl.apHistory || [],
                        })),
                    },
                standardSkills: {
                    create: validation.data.standardSkills.map(s => ({
                        name: s.name,
                        baseValue: s.baseValue,
                        currentProficiency: s.currentProficiency,
                        totalAddedPoints: s.totalAddedPoints ?? 0,
                        culturePoints: s.culturePoints ?? 0,
                        careerPoints: s.careerPoints ?? 0,
                        bonusPoints: s.bonusPoints ?? 0,
                        isProficient: s.isProficient,
                        isFumbled: s.isFumbled ?? false,
                    })),
                },
                magicSkills: {
                    // @ts-expect-error This is okay because I don't want magicSkills to be mandatory
                    create: validation.data.magicSkills.map(s => ({
                        name: s.name,
                        baseValue: s.baseValue,
                        currentProficiency: s.currentProficiency,
                        totalAddedPoints: s.totalAddedPoints ?? 0,
                        culturePoints: s.culturePoints ?? 0,
                        careerPoints: s.careerPoints ?? 0,
                        bonusPoints: s.bonusPoints ?? 0,
                        isProficient: s.isProficient,
                        isFumbled: s.isFumbled ?? false,
                        spellType: s.spellType ?? 'None',
                    })),
                },
                professionalSkills: {
                    create: validation.data.professionalSkills.map(s => ({
                        name: s.name,
                        baseValue: s.baseValue,
                        currentProficiency: s.currentProficiency,
                        totalAddedPoints: s.totalAddedPoints ?? 0,
                        culturePoints: s.culturePoints ?? 0,
                        careerPoints: s.careerPoints ?? 0,
                        bonusPoints: s.bonusPoints ?? 0,
                        isProficient: s.isProficient,
                        isFumbled: s.isFumbled ?? false,
                        specialty: s.specialty ?? undefined,
                    })),
                },
                combatStyles: {
                    create: validation.data.combatStyles.map(s => ({
                        name: s.name,
                        weapons: s.weapons,
                        traits: s.traits ?? undefined,
                        baseValue: s.baseValue,
                        currentProficiency: s.currentProficiency,
                        totalAddedPoints: s.totalAddedPoints ?? 0,
                        culturePoints: s.culturePoints ?? 0,
                        careerPoints: s.careerPoints ?? 0,
                        bonusPoints: s.bonusPoints ?? 0,
                        isProficient: s.isProficient,
                        isFumbled: s.isFumbled ?? false,
                    })),
                },
                passions: {
                    //@ts-expect-error yes it might be undefined, as it is optional
                    create: validation.data.passions.map(s => ({
                        name: s.name,
                        about: s.about,
                        baseValue: s.baseValue,
                        currentProficiency: s.currentProficiency,
                        totalAddedPoints: s.totalAddedPoints ?? 0,
                        culturePoints: s.culturePoints ?? 0,
                        careerPoints: s.careerPoints ?? 0,
                        bonusPoints: s.bonusPoints ?? 0,
                        isProficient: s.isProficient,
                        isFumbled: s.isFumbled ?? false,
                    })),
                },
            };

            await prisma.mythrasStdCharacter.upsert({
                where: { id: baseCharacter.id },
                create: { id: baseCharacter.id, ...mythrasData },
                update: {
                    // Delete existing relations and recreate
                    personal: { deleteMany: {}, create: mythrasData.personal.create },
                    characteristics: { deleteMany: {}, create: mythrasData.characteristics.create },
                    attributes: { deleteMany: {}, create: mythrasData.attributes.create },
                    hitLocations: { deleteMany: {}, create: mythrasData.hitLocations.create },
                    standardSkills: { deleteMany: {}, create: mythrasData.standardSkills.create },
                    magicSkills: { deleteMany: {}, create: mythrasData.magicSkills.create },
                    professionalSkills: { deleteMany: {}, create: mythrasData.professionalSkills.create },
                    combatStyles: { deleteMany: {}, create: mythrasData.combatStyles.create },
                    passions: { deleteMany: {}, create: mythrasData.passions.create },
                },
            });


            return { baseCharacter };
        }, {
            maxWait: 30000, // Maximum wait time for the transaction
            timeout: 30000,  // Overall transaction timeout
        });

        return {
            success: characterId ? 'Character updated!' : 'Character created!',
            characterId: result.baseCharacter.id,
        };
    } catch (error) {
        console.error('Database error:', error);
        return { error: error instanceof Error ? error.message : 'Database error' };
    }
};