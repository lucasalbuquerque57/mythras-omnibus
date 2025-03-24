// lib/species-config.ts
import { MythrasStdCharacteristicType } from "@prisma/client";

type SpeciesCharacteristicConfig = {
    min: number;
    max: number;
    roll: string;
    avg: number;
};

type SpeciesConfig = {
    [key in MythrasStdCharacteristicType]: SpeciesCharacteristicConfig;
};

export const SPECIES_CONFIG: Record<string, SpeciesConfig> = {
    Human: {
        Strength: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Constitution: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Size: { min: 6, max: 18, roll: '2d6+6', avg: 13 },
        Dexterity: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Intelligence: { min: 6, max: 18, roll: '2d6+6', avg: 13 },
        Power: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Charisma: { min: 3, max: 18, roll: '3d6', avg: 11 },
    },
    Elf: {
        Strength: { min: 5, max: 15, roll: '2d6+3', avg: 10 },
        Constitution: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Size: { min: 7, max: 12, roll: '1d6+6', avg: 10 },
        Dexterity: { min: 11, max: 21, roll: '2d6+9', avg: 16 },
        Intelligence: { min: 9, max: 19, roll: '2d6+7', avg: 14 },
        Power: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Charisma: { min: 3, max: 18, roll: '3d6', avg: 11 },
    },
    Dwarf: {
        Strength: { min: 11, max: 21, roll: '2d6+9', avg: 16 },
        Constitution: { min: 11, max: 21, roll: '2d6+9', avg: 16 },
        Size: { min: 10, max: 12, roll: '1d3+9', avg: 11 },
        Dexterity: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Intelligence: { min: 8, max: 18, roll: '2d6+6', avg: 13 },
        Power: { min: 3, max: 18, roll: '3d6', avg: 11 },
        Charisma: { min: 3, max: 18, roll: '3d6', avg: 11 },
    },
};

export type SpeciesName = keyof typeof SPECIES_CONFIG;