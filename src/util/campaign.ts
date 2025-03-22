import { db } from '@/lib/db';

export const getCampaignByName = async (name: string | undefined) => {
    try {
        const campaign = await db.campaign.findFirst({ where: { name } });
        return campaign;
    } catch {
        return null;
    }
};

export const getCampaignById = async (id: string | undefined) => {
    try {
        const campaign = await db.campaign.findUnique({ where: { id } });
        return campaign;
    } catch {
        return null;
    }
};