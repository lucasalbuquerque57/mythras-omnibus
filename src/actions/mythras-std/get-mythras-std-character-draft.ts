"use server";

// actions/get-character-draft.ts
import { db } from "@/lib/db";
import "server-only";

export const getMythrasStdCharacterDraft = async (characterId: string) => {
    try {
        return await db.character.findUnique({
            where: {
                id: characterId,
                status: 'DRAFT',
                mythrasDetails: { isNot: null }, // Ensure mythrasDetails exists
            },
            include: {
                mythrasDetails: {
                    include: {
                        personal: true,
                        characteristics: true,
                        attributes: true,
                        hitLocations: true,
                        standardSkills: true,
                        magicSkills: true,
                        professionalSkills: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
};