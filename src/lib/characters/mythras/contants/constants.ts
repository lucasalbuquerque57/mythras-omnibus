// lib/schemas/mythras-std/constants.ts

// Any changes here needs to be replicated inside schema.prisma

export const CHARACTERISTICS = [
    'Strength', 'Constitution', 'Size',
    'Dexterity', 'Intelligence', 'Power',
    'Charisma',
] as const;

export const ATTRIBUTES = [
    'Action Points', 'Damage Modifier', 'Experience Modifier',
    'Healing Rate', 'Initiative Bonus', 'Luck Points',
    'Movement Rate',
] as const;

export const HIT_LOCATIONS = [
    'Head', 'Thorax', 'Abdomen',
    'Right Arm', 'Left Arm',
    'Right Leg', 'Left Leg', 'Tail',
] as const;

export const STANDARD_SKILLS = [
    'Athletics', 'Boating', 'Brawn', 'Conceal', 'Customs',
    'Dance', 'Deceit', 'Drive', 'Endurance', 'Evade',
    'First Aid', 'Influence', 'Insight', 'Locale', 'Perception',
    'Ride', 'Sing', 'Stealth', 'Swim', 'Unarmed', 'Willpower',
] as const;

export const MAGIC_SKILLS = [
    'Binding', 'Devotion', 'Exhort', 'Folk Magic', 'Invocation',
    'Meditation', 'Mysticism', 'Shaping', 'Trance',
] as const;

export const PROFESSIONAL_SKILLS = [
    'Acting', 'Acrobatics', 'Bureaucracy', 'Commerce',
    'Courtesy', 'Disguise', 'Engineering', 'Gambling',
    'Healing', 'Literacy', 'Lockpicking', 'Mechanisms',
    'Navigation', 'Oratory', 'Seamanship', 'Seduction',
    'Sleight', 'Streetwise', 'Survival', 'Teach', 'Track',
] as const;

export const PROFESSIONAL_SKILLS_ANY = [
    'Art', 'Craft', 'Culture', 'Language', 'Lore',
] as const;


/*
export type ProfessionalSkillAny = `${(typeof PROFESSIONAL_SKILLS_ANY)[number]} (any)`;
*/




