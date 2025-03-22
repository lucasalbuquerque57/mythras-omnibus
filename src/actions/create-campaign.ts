'use server';

import * as z from 'zod';
import { CampaignSchema } from '@/schemas/campaigns';
import { db } from '@/lib/db';
import { getCampaignByName } from '@/util/campaign';

export const CreateCampaign = async (values: z.infer<typeof CampaignSchema>) => {
    // 1. Validate input using Zod schema ✅
    const validatedFields = CampaignSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Campos inválidos!' };
    }

    // 2. Destructure only needed values ✅
    const { name, description, system, directorId } = validatedFields.data;

    try {
        // 3. Check for existing campaign ✅
        const existingCampaign = await getCampaignByName(name);
        if (existingCampaign) {
            return { error: 'Já há uma campanha com este nome!' };
        }

        // 4. Validate director exists ✅
        const directorExists = await db.user.findUnique({
            where: { id: directorId },
        });

        if (!directorExists) {
            return { error: 'Diretor não encontrado!' };
        }

        // 5. Create campaign
        await db.campaign.create({
            data: {
                name,
                description,
                system,
                directorId,
                // characterIds: [] // Only include if you're handling characters, maybe I'll need it later, but not now
            },
        });

        return { success: 'Campanha criada com sucesso!' };

    } catch (error) {
        console.error('Campaign creation error:', error);
        return { error: 'Erro interno do servidor!' };
    }
};




/*
'use server';

import * as z from 'zod';
import { CampaignSchema } from '@/schemas/campaigns';
import { db } from '@/lib/db';
import { getCampaignByName  } from '@/util/campaign';
import {ZodArray, ZodNativeEnum, ZodOptional, ZodString} from "zod";


export const CreateCampaign = async (values: {
    name: ZodString["_output"];
    system: ZodNativeEnum<{ MYTHRAS_STD: "MYTHRAS_STD" }>["_output"];
    directorId: string;
    description?: ZodOptional<ZodString>["_output"];
    characterIds?: ZodOptional<ZodArray<ZodString>>["_output"]
}) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  CampaignSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!',
        };
    }
    const { name, description, system, directorId} = validatedFields.data;

    const existingCampaign = await getCampaignByName(name);

    if (existingCampaign) {
        return {
            error: 'Já há uma campanha com este nome!',
        };
    }

    await db.campaign.create({
        data: {
            name,
            description,
            system,
            directorId,
        },
    });

    return { success: 'Campanha criada!' };
};*/
