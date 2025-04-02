// app/(protected)/character/new/[characterId]/page.tsx
import {getMythrasStdCharacterDraft} from "@/actions/mythras-std/get-mythras-std-character-draft";
import { notFound } from 'next/navigation';
import {transformCharacter} from "@/util/mythras-std/character-transform";
import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";
import React from "react";

export default async function NewCharacterPage({
   params,
}: {
    params: Promise<{ characterId: string }>;
}) {
    const resolvedParams = await params;
    const characterId = resolvedParams.characterId;

    try {
        const character = await getMythrasStdCharacterDraft(characterId);

        if (!character?.mythrasDetails) {
            return notFound();
        }

        return (
            <div className="min-h-screen">
                <NavBar />
                <div className="max-w-4xl mx-auto p-4">
                    <NewCharacterWizard
                        characterId={characterId}
                        // @ts-expect-error might cause trouble later, but it works fine
                        initialData={transformCharacter(character)}
                    />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading character:', error);
        return notFound();
    }
}

