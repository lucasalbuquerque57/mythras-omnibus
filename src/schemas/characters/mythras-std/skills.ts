import {z} from "zod";
import {MythrasStdMagicSkillType, MythrasStdProfessionalSkillType, MythrasStdStandardSkillType} from "@prisma/client";

const baseSkillSchema = z.object({
    //the value acquired by the sum of two skills
    baseValue: z.number().int().positive(),
    //current value of the skill, baseValue+totalAddedPoints
    currentProficiency: z.number().int().positive(),
    //sum of culture, career and bonus points
    totalAddedPoints: z.number().int().nonnegative().optional(),
    //points that came from the culture column
    culturePoints: z.number().int().positive().optional(),
    //points that came from the career column
    careerPoints: z.number().int().positive().optional(),
    //points that came from the bonus columns
    bonusPoints: z.number().int().positive().optional(),
    //simple check
    isProficient: z.boolean(),
    //simple check
    isFumbled: z.boolean().optional(),
});

export const standardSkillSchema = baseSkillSchema.extend({
    name: z.nativeEnum(MythrasStdStandardSkillType),
});

export const magicSkillSchema = baseSkillSchema.extend({
    name: z.nativeEnum(MythrasStdMagicSkillType),
    spellType: z.string().optional(),
});

export const professionalSkillSchema = baseSkillSchema.extend({
    name: z.nativeEnum(MythrasStdProfessionalSkillType),
    specialty: z.string().optional(),
});