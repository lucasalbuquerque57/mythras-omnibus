import { MythrasStdCharacteristicType } from "@prisma/client";

type Characteristics = Record<MythrasStdCharacteristicType, number>;

export const calculateAttributes = (chars: Characteristics) => {
    const intDex = chars.Intelligence + chars.Dexterity;
    const strSiz = chars.Strength + chars.Size;
    const con = chars.Constitution;
    const pow = chars.Power;
    const cha = chars.Charisma;

    return {
        ActionPoints: Math.ceil(intDex / 12),
        DamageModifier: calculateDamageModifier(strSiz),
        ExperienceModifier: Math.ceil(((cha - 6) / 6)-1),
        HealingRate: Math.ceil(con / 6),
        InitiativeBonus: Math.ceil((chars.Intelligence + chars.Dexterity) / 2),
        LuckPoints: Math.ceil(pow / 6),
        MovementRate: 6,
    };
};

const calculateDamageModifier = (sum: number) => {
    if (sum <= 5) return "-1d8";
    if (sum <= 10) return "-1d6";
    if (sum <= 15) return "-1d4";
    if (sum <= 20) return "-1d2";
    if (sum <= 25) return "0";
    if (sum <= 30) return "+1d2";
    if (sum <= 35) return "+1d4";
    if (sum <= 40) return "+1d6";
    if (sum <= 45) return "+1d8";
    if (sum <= 50) return "+1d10";
    if (sum <= 60) return "+1d12";
    if (sum <= 70) return "+2d6";
    if (sum <= 80) return "+1d8+1d6";
    if (sum <= 90) return "+2d8";
    if (sum <= 100) return "+1d10+1d8";
    return `+${Math.floor((sum - 100) / 10) * 2}d10+1d${4 + Math.floor((sum - 100) / 10) * 2}`;
};