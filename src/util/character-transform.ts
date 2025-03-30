// lib/utils/character-transform.ts
import { MythrasCharacterData } from "@/schemas/characters/mythras-std";
import { Character, MythrasStdCharacter } from "@prisma/client";

type FullCharacter = Character & {
    mythrasDetails: MythrasStdCharacter & {
        personal: any[];
        characteristics: any[];
        attributes: any[];
        hitLocations: any[];
        standardSkills: any[];
        magicSkills: any[];
        professionalSkills: any[];
    };
};

export const transformCharacter = (
    prismaCharacter: Prisma.Prisma__CharacterClient<GetResult<Prisma.$CharacterPayload<DefaultArgs>, {
        where: { id: string; status: string; mythrasDetails: { isNot: null } };
        include: {
            mythrasDetails: {
                include: {
                    personal: boolean;
                    characteristics: boolean;
                    attributes: boolean;
                    hitLocations: boolean;
                    standardSkills: boolean;
                    magicSkills: boolean;
                    professionalSkills: boolean
                }
            }
        }
    }, "findUnique", Prisma.PrismaClientOptions> | null, null, DefaultArgs, Prisma.PrismaClientOptions>,
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
        skills: {
            standard: details.standardSkills.map(s => ({
                name: s.name,
                baseValue: s.baseValue,
                currentProficiency: s.currentProficiency,
                isProficient: s.isProficient,
                isFumbled: s.isFumbled || false,
            })),
            magic: details.magicSkills.map(s => ({
                name: s.name,
                baseValue: s.baseValue,
                currentProficiency: s.currentProficiency,
                isProficient: s.isProficient,
                isFumbled: s.isFumbled || false,
                spellType: s.spellType || 'None',
            })),
            professional: details.professionalSkills.map(s => ({
                name: s.name,
                baseValue: s.baseValue,
                currentProficiency: s.currentProficiency,
                isProficient: s.isProficient,
                isFumbled: s.isFumbled || false,
                specialty: s.specialty || undefined,
            })),
        },
        passion: [], // Add this if your schema requires it
    };
};