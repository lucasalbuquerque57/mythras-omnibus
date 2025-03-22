// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { CampaignSchema } from "@/schemas/campaigns";
import { currentUser } from "@/lib/auth";


export async function POST(req: Request) {
    const user = await currentUser();

    try {
        const json = await req.json();
        const body = CampaignSchema.parse(json);

        /*if (user?.id !== body.directorId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }*/

        const campaign = await db.campaign.create({
            data: {
                name: body.name,
                description: body.description,
                system: body.system,
                directorId: body.directorId,
            },
        });

        return NextResponse.json(campaign);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(error.errors, { status: 422 });
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}