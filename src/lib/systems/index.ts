// lib/systems.ts

import { z } from 'zod';
/* MYTHRAS IMPORTS */
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import {
    GameSystem,
    MythrasStdCharacteristicType,

} from '@prisma/client';
import { defaultCharacteristics } from '@/lib/systems/mythras-std/default-characteristics';
import { getInitialSkills } from '@/lib/systems/mythras-std/initial-skills';
//import { SPECIES_CONFIG } from '@/lib/systems/mythras-std/species-config';



/* My types for this stuff, I might put it in another file later */
type SystemConfig = {
    id: GameSystem;
    displayName: string;
    schema: typeof MythrasDataSchema;
    formSections: FormSection[];
    defaultValues: z.infer<typeof MythrasDataSchema>;
};

type FormSection = {
    title: string;
    gridClass: string;
    fields: FormField[];
};

type FormField = {
    path: string;
    label: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
};



/* The main thing in this file */
export const MYTHRAS_SYSTEM: SystemConfig = {
    id: 'MYTHRAS_STD',
    displayName: 'Mythras Standard',
    schema: MythrasDataSchema,
    formSections: [
        {
            title: 'Personal Information',
            gridClass: 'grid grid-cols-2 gap-4',
            fields: [
                {
                    path: 'personal.name',
                    label: 'Character Name',
                    type: 'text',
                },
                {
                    path: 'personal.age',
                    label: 'Age',
                    type: 'number',
                },
                {
                    path: 'personal.species',
                    label: 'Species',
                    type: 'select',
                    options: ['Human', 'Elf', 'Dwarf'],
                },
                {
                    path: 'personal.culture',
                    label: 'Culture',
                    type: 'text',
                },
                {
                    path: 'personal.homeland',
                    label: 'Homeland',
                    type: 'text',
                },
            ],
        },
        {
            title: 'Core Characteristics',
            gridClass: 'grid grid-cols-3 gap-4',
            fields: Object.values(MythrasStdCharacteristicType).map(
                (characteristic: MythrasStdCharacteristicType) => ({
                    path: `characteristics.${characteristic}.current`,
                    label: characteristic,
                    type: 'number' as const,
                }),
            ),
        },
    ],
    defaultValues: {
        personal: {
            name: '',
            player: '',
            nickname: '',
            age: 18,
            gender: '',

            species: 'Human',
            culture: '',
            homeland: '',
            religion: '',
            deity: '',
            socialClass: '',
            lord: '',

            career: '',
            faction: '',

            handedness: 'Destro',
            frame: '',
            height: '',
            weight: '',
        },
        characteristics: defaultCharacteristics,
        skills: getInitialSkills(defaultCharacteristics),
        attributes: [],
        hitLocations: [],
        passion: [],
    },
};



// Helper functions
export function getSystemConfig(systemId: GameSystem): SystemConfig {
    if (systemId === 'MYTHRAS_STD') return MYTHRAS_SYSTEM;
    throw new Error('System not found');
}

export function getAvailableSystems(): SystemConfig[] {
    return [MYTHRAS_SYSTEM];
}



/*

// lib/systems.ts

import { z } from 'zod';
/!* MYTHRAS IMPORTS *!/
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import {
    GameSystem,
    MythrasStdCharacteristicType,

} from '@prisma/client';
import { defaultCharacteristics } from '@/lib/systems/mythras-std/default-characteristics';
import { getInitialSkills } from '@/lib/systems/mythras-std/initial-skills';
import {MythrasCreationSchema} from "@/schemas/characters/mythras-std/character-creation";
//import { SPECIES_CONFIG } from '@/lib/systems/mythras-std/species-config';



/!* My types for this stuff, I might put it in another file later *!/
type SystemConfig = {
    id: GameSystem;
    displayName: string;
    schema: typeof MythrasDataSchema;
    formSections: FormSection[];
    defaultValues: z.infer<typeof MythrasDataSchema>;
};

type FormSection = {
    title: string;
    gridClass: string;
    fields: FormField[];
};

type FormField = {
    path: string;
    label: string;
    type: 'text' | 'number' | 'select';
    options?: string[];
};



/!* The main thing in this file *!/
export const MYTHRAS_SYSTEM: SystemConfig = {
    id: 'MYTHRAS_STD',
    displayName: 'Mythras Standard',
    schema: MythrasCreationSchema, // Use simplified schema
    formSections: [
        {
            title: 'Basic Information',
            gridClass: 'grid grid-cols-2 gap-4',
            fields: [
                { path: 'personal.name', label: 'Character Name', type: 'text' },
                { path: 'personal.species', label: 'Species', type: 'select', options: ['Human'] },
                { path: 'personal.culture', label: 'Culture', type: 'text' },
                { path: 'personal.age', label: 'Age', type: 'number' },
            ],
        },
        {
            title: 'Core Characteristics',
            gridClass: 'grid grid-cols-3 gap-4',
            fields: Object.values(MythrasStdCharacteristicType).map(char => ({
                path: `characteristics.${char}.current`,
                label: char,
                type: 'number' as const,
            })),
        },
    ],
    defaultValues: {
        personal: {
            name: '',
            player: '',
            nickname: '',
            age: 18,
            gender: '',

            species: 'Human',
            culture: '',
            homeland: '',
            religion: '',
            deity: '',
            socialClass: '',
            lord: '',

            career: '',
            faction: '',

            handedness: 'Destro',
            frame: '',
            height: '',
            weight: '',
        },
        characteristics: defaultCharacteristics,
        skills: getInitialSkills(defaultCharacteristics),
        attributes: [],
        hitLocations: [],
        passion: [],
    },
};



// Helper functions
export function getSystemConfig(systemId: GameSystem): SystemConfig {
    if (systemId === 'MYTHRAS_STD') return MYTHRAS_SYSTEM;
    throw new Error('System not found');
}

export function getAvailableSystems(): SystemConfig[] {
    return [MYTHRAS_SYSTEM];
}*/
