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
import { SkillsStep } from './steps/skills-step';


interface NewCharacterWizardProps {
    characterId?: string;
    initialData?: MythrasCharacterData;
}


export const NewCharacterWizard = ({
   characterId,
   initialData,
}: NewCharacterWizardProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState<z.infer<typeof MythrasDataSchema> | undefined>(initialData);
    const router = useRouter();

    useEffect(() => {
        if (characterId && initialData) {
            setCurrentStep(2);
            setFormData(initialData);
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
                    setFormData(values);
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

    const handleCharacteristicsSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        setFormData(values);
        setCurrentStep(3); // Move to skills step
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
        <div className="bg-card rounded-lg p-4 shadow-lg space-y-6">
            {/* Step indicator */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                            1
                        </div>
                        <div className={`h-1 w-12 ${
                            currentStep > 1 ? 'bg-primary' : 'bg-muted'
                        }`}></div>
                    </div>
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                            2
                        </div>
                        <div className={`h-1 w-12 ${
                            currentStep > 2 ? 'bg-primary' : 'bg-muted'
                        }`}></div>
                    </div>
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                            3
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                    <span>Personal</span>
                    <span>Characteristics</span>
                    <span>Skills</span>
                </div>
            </div>

            {/* Steps */}
            {currentStep === 1 && (
                <PersonalInfoStep
                    onSubmit={handlePersonalSubmit}
                    isPending={isPending}
                />
            )}

            {currentStep === 2 && formData && (
                <CharacteristicsStep
                    initialValues={formData}
                    onSubmit={handleCharacteristicsSubmit}
                    onBack={() => setCurrentStep(1)}
                    isPending={isPending}
                />
            )}

            {currentStep === 3 && formData && (
                <SkillsStep
                    initialValues={formData}
                    onSubmit={handleFinalSubmit}
                    onBack={() => setCurrentStep(2)}
                    isPending={isPending}
                />
            )}

            <FormError message={error} />
            <FormSuccess message={success} />
        </div>
    );
};