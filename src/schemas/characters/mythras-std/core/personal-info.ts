// schemas/character/base/characteristic.ts
import { z } from 'zod';

export const personalInfoSchema = z.object({
    name: z.string().min(3).max(40),
    player: z.string().min(3).max(40),
    nickname: z.string().max(40),
    age: z.number().min(1).max(350),
    gender: z.string().min(1).max(11),
    //communal
    species: z.string().min(3).max(20),
    culture: z.string().min(3).max(20),
    homeland: z.string().min(3).max(20),
    religion: z.string().min(3).max(20),
    deity: z.string().min(3).max(30).optional(),
    socialClass: z.string().max(15),
    lord: z.string().min(3).max(30).optional(),
    //life choices
    career: z.string().min(3).max(20),
    faction: z.string().min(3).max(20).optional(),
    //physical
    handedness: z.string().max(10),
    frame: z.string().min(3).max(10),
    height: z.string().min(3).max(5),
    weight: z.string().min(3).max(5),
});