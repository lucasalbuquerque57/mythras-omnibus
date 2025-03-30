"use client";

// app/(protected)/character/new/[characterId]/page.tsx
import { getCharacterDraft } from "@/actions/get-character-draft";
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";
import { NewCharacterWizard } from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
import { MythrasCharacterData } from "@/schemas/characters/mythras-std";
import { useEffect, useState } from "react";
import { transformCharacter } from "@/util/character-transform";

export default function NewCharacterPage({
 params,
}: {
    params: { characterId?: string };
}) {
    const [character, setCharacter] = useState<MythrasCharacterData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.characterId) {
            const fetchCharacter = async () => {
                try {
                    setLoading(true);
                    const data = await getCharacterDraft(params.characterId!);
                    if (!data) {
                        setError('Character not found');
                        return;
                    }
                    setCharacter(transformCharacter(data));
                } catch (err) {
                    setError('Failed to load character');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCharacter();
        } else {
            setLoading(false);
        }
    }, [params.characterId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen">
            <NavBar/>
            <div className="max-w-4xl mx-auto p-4">
                <NewCharacterWizard
                    characterId={params.characterId}
                    initialData={character}
                />
            </div>
        </div>
    );
}