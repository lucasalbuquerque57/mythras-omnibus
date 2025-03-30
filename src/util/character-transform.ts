// lib/utils/character-transform.ts
import { MythrasCharacterData } from "@/schemas/characters/mythras-std";

export const transformCharacter = (prismaData: any): MythrasCharacterData => {
    if (!prismaData?.mythrasDetails) throw new Error('Invalid character data');

    return {
        personal: prismaData.mythrasDetails.personal[0] || {
            name: '',
            player: '',
            gender: '',
            species: '',
            culture: '',
            homeland: '',
            career: '',
        },
        characteristics: prismaData.mythrasDetails.characteristics,
        attributes: prismaData.mythrasDetails.attributes,
        hitLocations: prismaData.mythrasDetails.hitLocations,
        skills: {
            standard: prismaData.mythrasDetails.standardSkills,
            magic: prismaData.mythrasDetails.magicSkills,
            professional: prismaData.mythrasDetails.professionalSkills,
        },
        passion: [],
    };
};