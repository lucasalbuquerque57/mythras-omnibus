// lib/utils/character-transform.ts
import { MythrasCharacterData } from "@/schemas/characters/mythras-std";
import { Character, MythrasStdCharacter } from "@prisma/client";

type FullCharacter = Character & {
    mythrasDetails: MythrasStdCharacter & {
        personal: MythrasCharacterData["personal"][];
        characteristics: MythrasCharacterData["characteristics"];
        attributes: MythrasCharacterData["attributes"];
        hitLocations: MythrasCharacterData["hitLocations"];
        standardSkills: MythrasCharacterData["standardSkills"];
        professionalSkills: MythrasCharacterData["professionalSkills"];
        magicSkills: MythrasCharacterData["magicSkills"];
        combatStyles: MythrasCharacterData["combatStyles"];
        passions: MythrasCharacterData["passions"];
    };
};

export const transformCharacter = (
    prismaCharacter: FullCharacter,
): MythrasCharacterData => {
    if (!prismaCharacter.mythrasDetails) {
        throw new Error('Invalid character data: Missing Mythras details');
    }

    const details = prismaCharacter.mythrasDetails;

    return {
        personal: {
            name: details.personal[0]?.name || '',
            player: details.personal[0]?.player || '',
            gender: details.personal[0]?.gender || '',
            species: details.personal[0]?.species || '',
            culture: details.personal[0]?.culture || '',
            homeland: details.personal[0]?.homeland || '',
            career: details.personal[0]?.career || '',
            nickname: details.personal[0]?.nickname || undefined,
            age: details.personal[0]?.age?.toString() || '20',
            religion: details.personal[0]?.religion || undefined,
            deity: details.personal[0]?.deity || undefined,
            socialClass: details.personal[0]?.socialClass || undefined,
            lord: details.personal[0]?.lord || undefined,
            faction: details.personal[0]?.faction || undefined,
            handedness: details.personal[0]?.handedness || 'Right',
            frame: details.personal[0]?.frame || 'Average',
            height: details.personal[0]?.height || '170cm',
            weight: details.personal[0]?.weight || '70kg',
        },
        characteristics: details.characteristics.map(c => ({
            name: c.name,
            original: Number(c.original),
            current: Number(c.current),
        })),
        attributes: details.attributes.map(a => ({
            name: a.name,
            original: a.original,
            current: a.current,
        })),
        hitLocations: details.hitLocations.map(hl => ({
            location: hl.location,
            armor: hl.armor || '',
            hp: hl.hp,
            ap: hl.ap || 0,
            hpHistory: hl.hpHistory || [],
            apHistory: hl.apHistory || [],
        })),
        // Updated skill sections
        standardSkills: details.standardSkills.map(s => ({
            name: s.name,
            baseValue: s.baseValue,
            currentProficiency: s.currentProficiency,
            totalAddedPoints: s.totalAddedPoints ?? undefined,
            culturePoints: s.culturePoints ?? undefined,
            careerPoints: s.careerPoints ?? undefined,
            bonusPoints: s.bonusPoints ?? undefined,
            isProficient: s.isProficient,
            isFumbled: s.isFumbled ?? false,
        })),
        magicSkills: (details.magicSkills || []).map(s => ({
            name: s.name,
            baseValue: s.baseValue,
            currentProficiency: s.currentProficiency,
            totalAddedPoints: s.totalAddedPoints ?? undefined,
            culturePoints: s.culturePoints ?? undefined,
            careerPoints: s.careerPoints ?? undefined,
            bonusPoints: s.bonusPoints ?? undefined,
            isProficient: s.isProficient,
            isFumbled: s.isFumbled ?? false,
            spellType: s.spellType ?? undefined,
        })),
        professionalSkills: details.professionalSkills.map(s => ({
            name: s.name,
            baseValue: s.baseValue,
            currentProficiency: s.currentProficiency,
            totalAddedPoints: s.totalAddedPoints ?? undefined,
            culturePoints: s.culturePoints ?? undefined,
            careerPoints: s.careerPoints ?? undefined,
            bonusPoints: s.bonusPoints ?? undefined,
            isProficient: s.isProficient,
            isFumbled: s.isFumbled ?? false,
            specialty: s.specialty ?? undefined,
        })),
        /*I was getting some errors here only when I accessed Step 2 of character creation, the current code makes this at least empty, not undefined*/
        combatStyles: (details.combatStyles || []).map(s => ({
            name: s.name,
            weapons: s.weapons,
            traits: s.traits,
            baseValue: s.baseValue,
            currentProficiency: s.currentProficiency,
            totalAddedPoints: s.totalAddedPoints ?? undefined,
            culturePoints: s.culturePoints ?? undefined,
            careerPoints: s.careerPoints ?? undefined,
            bonusPoints: s.bonusPoints ?? undefined,
            isProficient: s.isProficient,
            isFumbled: s.isFumbled ?? false,
        })),
        passions: (details.passions || []).map(s => ({
            name: s.name,
            about: s.about,
            baseValue: s.baseValue,
            currentProficiency: s.currentProficiency,
            totalAddedPoints: s.totalAddedPoints ?? undefined,
            culturePoints: s.culturePoints ?? undefined,
            careerPoints: s.careerPoints ?? undefined,
            bonusPoints: s.bonusPoints ?? undefined,
            isProficient: s.isProficient,
            isFumbled: s.isFumbled ?? false,
        })),
    };
};