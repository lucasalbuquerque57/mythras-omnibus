// lib/characteristic-generator.ts
import { MythrasStdCharacteristicType } from "@prisma/client";
import { SPECIES_CONFIG } from "./species-config";

const parseRoll = (roll: string): number => {
    const [dice, modifier] = roll.split(/[+-]/);
    const [numDice, diceSides] = dice.split('d').map(Number);
    let result = 0;

    for (let i = 0; i < numDice; i++) {
        result += Math.floor(Math.random() * diceSides) + 1;
    }

    if (modifier) {
        const operator = roll.includes('+') ? '+' : '-';
        result = operator === '+'
            ? result + parseInt(modifier)
            : result - parseInt(modifier);
    }

    return result;
};

export const generateCharacteristics = (
    species: keyof typeof SPECIES_CONFIG,
    useAverage: boolean = true,
) => {
    const config = SPECIES_CONFIG[species];

    return Object.entries(config).map(([characteristic, cfg]) => ({
        name: characteristic as MythrasStdCharacteristicType,
        original: useAverage ? cfg.avg : parseRoll(cfg.roll),
        current: useAverage ? cfg.avg : parseRoll(cfg.roll),
    }));
};