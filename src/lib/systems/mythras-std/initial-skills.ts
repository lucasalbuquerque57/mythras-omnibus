import {ZodAny} from "zod";
import {
    MythrasStdCharacteristicType, MythrasStdMagicSkillType,
    MythrasStdProfessionalSkillType,
    MythrasStdStandardSkillType,
} from "@prisma/client";
import {skillFormulas} from "@/lib/systems/mythras-std/skill-formulas";

export const getInitialSkills = (characteristics: ZodAny["_output"][] | undefined) => {
    const charsMap = characteristics.reduce((acc, curr) => {
        acc[curr.name] = curr.current;
        return acc;
    }, {} as Record<MythrasStdCharacteristicType, number>);

    return {
        standard: Object.values(MythrasStdStandardSkillType).map((skill) => ({
            name: skill,
            baseValue: skillFormulas[skill]?.(charsMap) || 0,
            currentProficiency: skillFormulas[skill]?.(charsMap) || 0,
            isProficient: false,
            isFumbled: false,
        })),
        professional: Object.values(MythrasStdProfessionalSkillType).map((skill) => ({
            name: skill,
            baseValue: skillFormulas[skill]?.(charsMap) || 0,
            currentProficiency: skillFormulas[skill]?.(charsMap) || 0,
            specialty: '',
            isProficient: false,
            isFumbled: false,
        })),
        magic: Object.values(MythrasStdMagicSkillType).map((skill) => ({
            name: skill,
            baseValue: skillFormulas[skill]?.(charsMap) || 0,
            currentProficiency: skillFormulas[skill]?.(charsMap) || 0,
            isProficient: false,
            isFumbled: false,
        })),
    };
};