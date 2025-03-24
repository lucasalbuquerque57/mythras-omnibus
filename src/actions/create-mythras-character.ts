// actions/create-mythras-character.ts
'use server';

import { db } from '@/lib/db';
import { MythrasCreationSchema, Step1Schema } from '@/schemas/characters/mythras-std/character-creation';
import { z } from 'zod';

// I might need to change void to {} if some error appears
type ActionResponse<T = void> =
    | { status: 'success'; message: string; data: T }
    | { status: 'error'; error: string };

export const createMythrasCharacter = async (
    values: z.infer<typeof MythrasCreationSchema>,
): Promise<ActionResponse<{ characterId: string }>> => {
    const validation = MythrasCreationSchema.safeParse(values);
    if (!validation.success) {
        return {
            status: 'error',
            error: 'Invalid fields! Please check your input values.',
        };
    }

    const { userId, system, step, data } = validation.data;

    try {
        const user = await db.user.findUnique({ where: { id: userId }});
        if (!user) {
            return {
                status: 'error',
                error: 'User not found! Please authenticate first.',
            };
        }

        switch (step) {
            case 1:
                return handleInitialCreation(userId, system, data);

            default:
                return {
                    status: 'error',
                    error: 'Invalid creation step! Please start from step 1.',
                };
        }
    } catch (error) {
        console.error('Character creation error:', error);
        return {
            status: 'error',
            error: 'Internal server error! Please try again later.',
        };
    }
};

const handleInitialCreation = async (
    userId: string,
    system: 'MYTHRAS_STD',
    data: z.infer<typeof Step1Schema>,
): Promise<ActionResponse<{ characterId: string }>> => {
    try {
        const newCharacter = await db.character.create({
            data: {
                userId,
                system,
                name: data.personal.name,
                // temporary measure, it will be actual name of the player, instead of it's ID
                player: userId,
                mythrasData: {
                    personal: data.personal,
                    characteristics: [],
                    attributes: [],
                    hitLocations: [],
                    skills: {
                        standard: [],
                        magic: [],
                        professional: [],
                    },
                    passion: [],
                },
            },
        });

        return {
            status: 'success',
            message: 'Character created successfully!',
            data: { characterId: newCharacter.id },
        };
    } catch (error) {
        console.error('Database creation error:', error);
        return {
            status: 'error',
            error: 'Failed to create character! Please check your data.',
        };
    }
};