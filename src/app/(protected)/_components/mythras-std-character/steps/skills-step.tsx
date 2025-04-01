'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import { getInitialSkills } from '@/lib/systems/mythras-std/initial-skills';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { PencilLine } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface SkillsStepProps {
    initialValues: z.infer<typeof MythrasDataSchema>;
    onSubmit: (values: z.infer<typeof MythrasDataSchema>) => void;
    onBack: () => void;
    isPending: boolean;
}

export const SkillsStep = ({
   initialValues,
   onSubmit,
   onBack,
   isPending,
}: SkillsStepProps) => {
    // Points pools
    const [baseCulturePoints, setBaseCulturePoints] = useState(100);
    const [baseCareerPoints, setBaseCareerPoints] = useState(100);
    const [baseBonusPoints, setBaseBonusPoints] = useState(150);

    const [culturePoints, setCulturePoints] = useState(baseCulturePoints);
    const [careerPoints, setCareerPoints] = useState(baseCareerPoints);
    const [bonusPoints, setBonusPoints] = useState(baseBonusPoints);

    // Initialize form with current values
    const form = useForm<z.infer<typeof MythrasDataSchema>>({
        defaultValues: initialValues,
    });

    // Extract key character information
    const characterSpecies = form.watch('personal.species');
    const characterCulture = form.watch('personal.culture');
    const characterCareer = form.watch('personal.career');
    const characteristics = form.watch('characteristics');
    const standardSkills = form.watch('standardSkills');
    const professionalSkills = form.watch('professionalSkills');
    const magicSkills = form.watch('magicSkills');

    // Function to calculate remaining points
    const calculateRemainingPoints = () => {
        let usedCulturePoints = 0;
        let usedCareerPoints = 0;
        let usedBonusPoints = 0;

        // Calculate from standard skills
        standardSkills?.forEach(skill => {
            usedCulturePoints += skill.culturePoints || 0;
            usedCareerPoints += skill.careerPoints || 0;
            usedBonusPoints += skill.bonusPoints || 0;
        });

        // Calculate from professional skills
        professionalSkills?.forEach(skill => {
            usedCulturePoints += skill.culturePoints || 0;
            usedCareerPoints += skill.careerPoints || 0;
            usedBonusPoints += skill.bonusPoints || 0;
        });

        // Calculate from magic skills
        magicSkills?.forEach(skill => {
            usedCulturePoints += skill.culturePoints || 0;
            usedCareerPoints += skill.careerPoints || 0;
            usedBonusPoints += skill.bonusPoints || 0;
        });

        return {
            cultureRemaining: baseCulturePoints - usedCulturePoints,
            careerRemaining: baseCareerPoints - usedCareerPoints,
            bonusRemaining: baseBonusPoints - usedBonusPoints,
        };
    };

    const remainingPoints = calculateRemainingPoints();

    useEffect(() => {
        // Use the helper function to get initial skills based on characteristics
        const initialSkills = getInitialSkills(characteristics);

        // Set the skills in the form if they don't already exist
        if (initialSkills && (!standardSkills?.length || !professionalSkills?.length)) {
            form.setValue('standardSkills', initialSkills.standard);
            form.setValue('professionalSkills', initialSkills.professional);
            form.setValue('magicSkills', initialSkills.magic);
        }

        // Log for debugging
        console.log('Character Skills Step Loaded:', {
            species: characterSpecies,
            culture: characterCulture,
            career: characterCareer,
            initialSkills,
        });

    }, [characterCareer, characterCulture, characterSpecies, characteristics, form, standardSkills, professionalSkills]);

    // Handle point allocation
    const handlePointsChange = (
        skillType: 'standardSkills' | 'professionalSkills' | 'magicSkills',
        index: number,
        pointType: 'culturePoints' | 'careerPoints' | 'bonusPoints',
        value: number,
    ) => {
        const skills = form.getValues(skillType);
        // @ts-expect-error It should possibly undefined as not everyone will have all skills or skill types
        const currentValue = skills[index][pointType] || 0;

        // Calculate how many points this would add or remove
        const diff = value - currentValue;

        // Check if we have enough points
        let remainingForType = 0;
        switch (pointType) {
            case 'culturePoints':
                remainingForType = remainingPoints.cultureRemaining;
                break;
            case 'careerPoints':
                remainingForType = remainingPoints.careerRemaining;
                break;
            case 'bonusPoints':
                remainingForType = remainingPoints.bonusRemaining;
                break;
        }

        if (diff > remainingForType) {
            // Not enough points
            return;
        }

        // Update skill points
        // @ts-expect-error It's working fine actually, TS is being weird
        const newSkills = [...skills];
        newSkills[index] = {
            ...newSkills[index],
            [pointType]: value,
            totalAddedPoints: (newSkills[index].totalAddedPoints || 0) + diff,
            currentProficiency: newSkills[index].baseValue + (newSkills[index].totalAddedPoints || 0) + diff,
        };

        form.setValue(skillType, newSkills);

        // Update remaining points
        switch (pointType) {
            case 'culturePoints':
                setCulturePoints(prev => prev - diff);
                break;
            case 'careerPoints':
                setCareerPoints(prev => prev - diff);
                break;
            case 'bonusPoints':
                setBonusPoints(prev => prev - diff);
                break;
        }
    };

    // Handle proficiency toggle
    const handleProficiencyToggle = (
        skillType: 'standardSkills' | 'professionalSkills' | 'magicSkills',
        index: number,
        isChecked: boolean,
    ) => {
        const skills = form.getValues(skillType);
        //@ts-expect-error sometimes TS flags this, sometimes not, it is bugged and will flag this comment sometimes
        const newSkills = [...skills];
        newSkills[index] = {
            ...newSkills[index],
            isProficient: isChecked,
        };
        form.setValue(skillType, newSkills);
    };

    // Update points pools based on user input
    const updatePointsPool = (
        pointType: 'culture' | 'career' | 'bonus',
        value: number,
    ) => {
        if (value < 0) return; // Prevent negative values

        switch (pointType) {
            case 'culture':
                setBaseCulturePoints(value);
                break;
            case 'career':
                setBaseCareerPoints(value);
                break;
            case 'bonus':
                setBaseBonusPoints(value);
                break;
        }
    };

    const handleSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
        // Filter professional and magic skills to only include proficient ones
        const filteredValues = {
            ...values,
            professionalSkills: values.professionalSkills?.filter(skill => skill.isProficient) || [],
            magicSkills: values.magicSkills?.filter(skill => skill.isProficient) || [],
        };

        console.log('Submitting skills step data:', filteredValues);
        onSubmit(filteredValues);
    };

    const EditPointsPopover = () => {
        return (
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Pontos</h4>
                    <p className="text-sm text-muted-foreground">
                        Defina a quantidade máxima de pontos
                    </p>
                </div>
                <div className="grid gap-2">
                    {/*TODO: Fix this annoying thing where on each keystroke the input goes out of focus */}
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="culture-points">Cultura</Label>
                        <Input
                            id="culture-points"
                            type="number"
                            min="0"
                            value={baseCulturePoints}
                            onChange={(e) => updatePointsPool('culture', parseInt(e.target.value) || 0)}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="career-points">Carreira</Label>
                        <Input
                            id="career-points"
                            type="number"
                            min="0"
                            value={baseCareerPoints}
                            onChange={(e) => updatePointsPool('career', parseInt(e.target.value) || 0)}
                            className="col-span-2 h-8"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="bonus-points">Bônus</Label>
                        <Input
                            id="bonus-points"
                            type="number"
                            min="0"
                            value={baseBonusPoints}
                            onChange={(e) => updatePointsPool('bonus', parseInt(e.target.value) || 0)}
                            className="col-span-2 h-8"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Character info display */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Character Information</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border p-3 rounded-lg ">
                            <p className="text-xs sm:text-sm font-medium">Species</p>
                            <p className="text-base font-semibold">{characterSpecies}</p>
                        </div>
                        <div className="border p-3 rounded-lg ">
                            <p className="text-xs sm:text-sm font-medium">Culture</p>
                            <p className="text-base font-semibold">{characterCulture}</p>
                            {/*TODO: Add a tooltip that will show what Proficiencies the Culture gives you */}
                        </div>
                        <div className="border p-3 rounded-lg ">
                            <p className="text-xs sm:text-sm font-medium">Career</p>
                            <p className="text-base font-semibold">{characterCareer}</p>
                        </div>
                    </div>
                </div>

                {/* Points Pool Display */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center">
                            <CardTitle>Points Pools</CardTitle>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="ml-3">
                                        <PencilLine className="w-4 h-4" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="p-4 border bg-zinc-950 rounded-md shadow-md">
                                    <EditPointsPopover/>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border p-3 rounded-lg  text-center">
                                <p className="text-xs sm:text-sm font-medium">Culture Points</p>
                                <p className="text-xl font-bold">{remainingPoints.cultureRemaining} / {baseCulturePoints}</p>
                            </div>
                            <div className="border p-3 rounded-lg  text-center">
                                <p className="text-xs sm:text-sm font-medium">Career Points</p>
                                <p className="text-xl font-bold">{remainingPoints.careerRemaining} / {baseCareerPoints}</p>
                            </div>
                            <div className="border p-3 rounded-lg  text-center">
                                <p className="text-xs sm:text-sm font-medium">Bonus Points</p>
                                <p className="text-xl font-bold">{remainingPoints.bonusRemaining} / {baseBonusPoints}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Skills Tabs */}
                <Tabs defaultValue="standard" className="w-full">
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="standard">Standard Skills</TabsTrigger>
                        <TabsTrigger value="professional">Professional Skills</TabsTrigger>
                        <TabsTrigger value="magic">Magic Skills</TabsTrigger>
                    </TabsList>

                    {/* Standard Skills */}
                    <TabsContent value="standard">
                        <Card>
                            <CardHeader>
                                <CardTitle>Standard Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {standardSkills?.map((skill, index) => (
                                        <div key={skill.name} className="border p-3 rounded-lg  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <div className="flex items-center gap-2 w-full sm:w-1/4">
                                                <Checkbox
                                                    id={`standard-proficient-${index}`}
                                                    checked={skill.isProficient}
                                                    onCheckedChange={(checked) =>
                                                        handleProficiencyToggle('standardSkills', index, checked === true)
                                                    }
                                                />
                                                <label
                                                    htmlFor={`standard-proficient-${index}`}
                                                    className="font-medium capitalize cursor-pointer"
                                                >
                                                    {skill.name.replace(/([A-Z])/g, ' $1').trim()}
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2 w-full">
                                                <span className="text-xs w-16">Base: {skill.baseValue}</span>
                                                <div className="grid grid-cols-3 gap-2 flex-1">
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Culture</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.culturePoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'standardSkills',
                                                                index,
                                                                'culturePoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Career</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.careerPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'standardSkills',
                                                                index,
                                                                'careerPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Bonus</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.bonusPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'standardSkills',
                                                                index,
                                                                'bonusPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-16 text-right font-semibold">
                                                    Total: {skill.currentProficiency}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Professional Skills */}
                    <TabsContent value="professional">
                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {professionalSkills?.map((skill, index) => (
                                        <div key={skill.name} className="border p-3 rounded-lg  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <div className="flex items-center gap-2 w-full sm:w-1/4">
                                                <Checkbox
                                                    id={`prof-proficient-${index}`}
                                                    checked={skill.isProficient}
                                                    onCheckedChange={(checked) =>
                                                        handleProficiencyToggle('professionalSkills', index, checked === true)
                                                    }
                                                />
                                                <label
                                                    htmlFor={`prof-proficient-${index}`}
                                                    className="font-medium capitalize cursor-pointer"
                                                >
                                                    {skill.name.replace(/([A-Z])/g, ' $1').trim()}
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2 w-full">
                                                <span className="text-xs w-16">Base: {skill.baseValue}</span>
                                                <div className="grid grid-cols-3 gap-2 flex-1">
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Culture</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.culturePoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'professionalSkills',
                                                                index,
                                                                'culturePoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Career</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.careerPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'professionalSkills',
                                                                index,
                                                                'careerPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Bonus</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.bonusPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'professionalSkills',
                                                                index,
                                                                'bonusPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-16 text-right font-semibold">
                                                    Total: {skill.currentProficiency}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Magic Skills */}
                    <TabsContent value="magic">
                        <Card>
                            <CardHeader>
                                <CardTitle>Magic Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {magicSkills?.map((skill, index) => (
                                        <div key={skill.name} className="border p-3 rounded-lg  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <div className="flex items-center gap-2 w-full sm:w-1/4">
                                                <Checkbox
                                                    id={`magic-proficient-${index}`}
                                                    checked={skill.isProficient}
                                                    onCheckedChange={(checked) =>
                                                        handleProficiencyToggle('magicSkills', index, checked === true)
                                                    }
                                                />
                                                <label
                                                    htmlFor={`magic-proficient-${index}`}
                                                    className="font-medium capitalize cursor-pointer"
                                                >
                                                    {skill.name.replace(/([A-Z])/g, ' $1').trim()}
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2 w-full">
                                                <span className="text-xs w-16">Base: {skill.baseValue}</span>
                                                <div className="grid grid-cols-3 gap-2 flex-1">
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Culture</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.culturePoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'magicSkills',
                                                                index,
                                                                'culturePoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Career</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.careerPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'magicSkills',
                                                                index,
                                                                'careerPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <label className="text-xs">Bonus</label>
                                                        <Input
                                                            type="number"
                                                            value={skill.bonusPoints || 0}
                                                            min={0}
                                                            onChange={(e) => handlePointsChange(
                                                                'magicSkills',
                                                                index,
                                                                'bonusPoints',
                                                                parseInt(e.target.value) || 0,
                                                            )}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-16 text-right font-semibold">
                                                    Total: {skill.currentProficiency}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Navigation buttons */}
                <div className="flex justify-between">
                    <Button type="button" variant="ghost" onClick={onBack} disabled={isPending}>
                        Voltar
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        Finalizar
                    </Button>
                </div>
            </form>
        </Form>
    );
};