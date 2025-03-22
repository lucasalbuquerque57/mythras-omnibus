// lib/types/campaign.ts
import {Campaign, CampaignCharacter, Character, User} from '@prisma/client';
import { MythrasCharacter } from '@/types/characters/mythras/types';

export type FullCampaign = Campaign & {
    createdBy: User;
    characters: (CampaignCharacter & {
        character: Character & {
            mythrasDetails?: MythrasCharacter;
        };
    })[];
};

export type CampaignSummary = Pick<Campaign,
    'id' | 'name' | 'system' | 'createdAt'
> & {
    characterCount: number;
    activeCharacterCount: number;
};