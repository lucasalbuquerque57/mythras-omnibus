// app/(protected)/character/new/[characterId]/page.tsx
import {getCharacterDraft} from "@/actions/get-character-draft";
import { notFound } from 'next/navigation';
import {transformCharacter} from "@/util/character-transform";
import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";
import React from "react";

export default async function NewCharacterPage({
   params,
}: {
    params: { characterId: string };
}) {
    // Await the params before using them, I forgot this little shit and my terminal was going nuts
    const resolvedParams = await params;
    const characterId = resolvedParams.characterId;

    try {
        const character = await getCharacterDraft(characterId);

        if (!character?.mythrasDetails) {
            return notFound();
        }

        return (
            <div className="min-h-screen">
                <NavBar />
                <div className="max-w-4xl mx-auto p-4">
                    <NewCharacterWizard
                        characterId={characterId}
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