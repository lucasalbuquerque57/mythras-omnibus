// app/(protected)/_components/mythras-std-character/character-creation-wizard.tsx
'use client';

import {useState, useTransition, useEffect} from 'react';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { createMythrasCharacter } from '@/actions/create-mythras-character';
import {MythrasCharacterData, MythrasDataSchema} from '@/schemas/characters/mythras-std';
import { PersonalInfoStep } from './steps/personal-info-step';
import { CharacteristicsStep } from './steps/characteristics-step';
import {z} from "zod";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useRouter} from "next/navigation";

interface NewCharacterWizardProps {
  characterId?: string;
  initialData?: MythrasCharacterData | null;
}

export const NewCharacterWizard = ({
 characterId: propCharacterId,
 initialData
 }: NewCharacterWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<z.infer<typeof MythrasDataSchema>>();
  const [characterId, setCharacterId] = useState<string | null>(null);
  const user = useCurrentUser();

  const [draftCharacterId, setDraftCharacterId] = useState<string | null>(null);
  const router = useRouter();


  const handlePersonalSubmit = async (values: z.infer<typeof MythrasDataSchema>) => {
    startTransition(async () => {
      const response = await createMythrasCharacter(values);
      if (response?.success) {
        setDraftCharacterId(response.characterId);
        router.push(`/character/new/${response.characterId}`);
      }
    });
  };

  const handleFinalSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
    startTransition(async () => {
      if (!draftCharacterId) return;

      const response = await createMythrasCharacter(values, draftCharacterId);
      if (response?.success) {
        router.push(`/character/${draftCharacterId}`);
      }
    });
  };

  useEffect(() => {
    if (propCharacterId) {
      setDraftCharacterId(propCharacterId);
    }
  }, [propCharacterId]);

  return (
      <div className="bg-card rounded-lg p-6 shadow-lg">
        {/* Step indicator */}

        {currentStep === 1 && (
            <PersonalInfoStep
                onSubmit={handlePersonalSubmit}
                isPending={isPending}
            />
        )}

        {currentStep === 2 && formData && (
            <CharacteristicsStep
                initialValues={formData}
                onSubmit={handleFinalSubmit}
                onBack={() => setCurrentStep(1)}
                isPending={isPending}
            />
        )}

        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
  );
};