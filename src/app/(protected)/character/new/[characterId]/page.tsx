// app/(protected)/character/new/[characterId]/page.tsx
import {getCharacterDraft} from "@/actions/get-character-draft";
import {notFound} from "next/navigation";
import {transformCharacter} from "@/util/character-transform";
import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";

export default async function NewCharacterPage({
   params,
}: {
    params: { characterId?: string };
}) {
    if (!params.characterId) {
        return <NewCharacterWizard />;
    }

    const character = await getCharacterDraft(params.characterId);

    if (!character?.mythrasDetails) {
        return notFound();
    }

    return (
        <div className="min-h-screen">
            <NavBar />
            <div className="max-w-4xl mx-auto p-4">
                <NewCharacterWizard
                    characterId={params.characterId}
                    initialData={transformCharacter(character)}
                />
            </div>
        </div>
    );
}