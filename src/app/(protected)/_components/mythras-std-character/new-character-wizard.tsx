// app/(protected)/_components/mythras-std-character/new-character-wizard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { createMythrasCharacter } from '@/actions/create-mythras-character';
import {MythrasCharacterData, MythrasDataSchema } from '@/schemas/characters/mythras-std';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { PersonalInfoStep } from './steps/personal-info-step';
import { CharacteristicsStep } from './steps/characteristics-step';


interface NewCharacterWizardProps {
    characterId?: string;
    initialData?: MythrasCharacterData; // Remove null possibility
}


export const NewCharacterWizard = ({
   characterId,
   initialData,
}: NewCharacterWizardProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        if (characterId && initialData) {
            setCurrentStep(2);
        }
    }, [characterId, initialData]);

    const handlePersonalSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(async () => {
            try {
                const response = await createMythrasCharacter(values);
                if (response?.success) {
                    setSuccess('Character created successfully!');
                    router.push(`/character/new/${response.characterId}`);
                }
                if (response?.error) {
                    setError(response.error);
                }
            } catch (error) {
                console.error('Operation failed:', error);  // Actually use the error
                setError('An unexpected error occurred');
            }
        });
    };

    const handleFinalSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(async () => {
            try {
                const response = await createMythrasCharacter(values, characterId);
                if (response?.success) {
                    setSuccess('Character updated successfully!');
                    router.push(`/character/${response.characterId}`);
                }
                if (response?.error) {
                    setError(response.error);
                }
            } catch (error) {
                console.error('Operation failed:', error);  // Actually use the error
                setError('An unexpected error occurred');
            }
        });
    };

    return (
        <div className="bg-card rounded-lg p-6 shadow-lg">
            {/* Step indicator and form components */}
            {currentStep === 1 && (
                <PersonalInfoStep
                    onSubmit={handlePersonalSubmit}
                    isPending={isPending}
                />
            )}

            {currentStep === 2 && (
                <CharacteristicsStep
                    initialValues={initialData!}
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