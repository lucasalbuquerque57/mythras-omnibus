// lib/defaults/hit-locations.ts
import { MythrasStdCharacteristicType, MythrasStdHitLocationType } from "@prisma/client";

type Characteristics = Record<MythrasStdCharacteristicType, number>;

export const calculateHitLocations = (chars: Characteristics) => {
    const conSiz = chars.Constitution + chars.Size;
    let baseHP: Record<MythrasStdHitLocationType, number>;

    if (conSiz <= 5) {
        baseHP = {
            [MythrasStdHitLocationType.Head]: 1,
            [MythrasStdHitLocationType.Thorax]: 3,
            [MythrasStdHitLocationType.Abdomen]: 2,
            [MythrasStdHitLocationType.RightArm]: 1,
            [MythrasStdHitLocationType.LeftArm]: 1,
            [MythrasStdHitLocationType.RightLeg]: 1,
            [MythrasStdHitLocationType.LeftLeg]: 1,
            [MythrasStdHitLocationType.Tail]: 1,
        };
    } else {
        // Base values for 6-10 CON+SIZ
        const initialBonus = Math.floor((conSiz - 6) / 5);
        baseHP = {
            [MythrasStdHitLocationType.Head]: 2 + initialBonus,
            [MythrasStdHitLocationType.Thorax]: 4 + initialBonus,
            [MythrasStdHitLocationType.Abdomen]: 3 + initialBonus,
            [MythrasStdHitLocationType.RightArm]: 1 + initialBonus,
            [MythrasStdHitLocationType.LeftArm]: 1 + initialBonus,
            [MythrasStdHitLocationType.RightLeg]: 2 + initialBonus,
            [MythrasStdHitLocationType.LeftLeg]: 2 + initialBonus,
            [MythrasStdHitLocationType.Tail]: 1 + initialBonus,
        };
    }

    return Object.entries(baseHP).map(([location, hp]) => ({
        location: location as MythrasStdHitLocationType,
        hp,
        ap: 0,
        armor: "",
        hpHistory: [],
        apHistory: [],
    }));
};