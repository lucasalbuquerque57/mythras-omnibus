'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { calculateAttributes } from '@/lib/systems/mythras-std/attributes-calculator';
import { calculateHitLocations } from "@/lib/systems/mythras-std/hit-locations-calculator";
import { MythrasStdCharacteristicType, MythrasStdAttributeType } from '@prisma/client';
import { z } from 'zod';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';


interface CharacteristicsStepProps {
    initialValues: z.infer<typeof MythrasDataSchema>;
    onSubmit: (values: z.infer<typeof MythrasDataSchema>) => void;
    onBack: () => void;
    isPending: boolean;
}

export const CharacteristicsStep = ({
    initialValues,
    onSubmit,
    onBack,
    isPending,
}: CharacteristicsStepProps) => {
    const form = useForm<z.infer<typeof MythrasDataSchema>>({
        defaultValues: {
            ...initialValues,
            personal: {
                ...initialValues.personal,
                species: initialValues.personal.species, // Default if not provided
            },
            characteristics: initialValues.characteristics?.length
                ? initialValues.characteristics
                : Object.values(MythrasStdCharacteristicType).map(name => ({
                    name,
                    original: 10,
                    current: 10,
                })),
            attributes: [],
            hitLocations: [],
        },
    });

    // Watch all characteristics and recalculate when they change, but for some reason it is not working as of now
    const characteristics = form.watch('characteristics');


    const handleCalculate = () => {
        const chars = characteristics.reduce((acc, curr) => {
            acc[curr.name as MythrasStdCharacteristicType] = curr.original;
            return acc;
        }, {} as Record<MythrasStdCharacteristicType, number>);

        const calculatedAttributes = calculateAttributes(chars, form.getValues('personal.species'));
        const calculatedHitLocations = calculateHitLocations(chars, form.getValues('personal.species'));

        console.log('Manual calculation triggered', {
            characteristics: chars,
            attributes: calculatedAttributes,
            hitLocations: calculatedHitLocations,
        });

        form.setValue('attributes',
            Object.entries(calculatedAttributes).map(([name, value]) => ({
                    name: name as MythrasStdAttributeType,
                    original: String(value),
                    current: String(value),
                }),
            ));

        form.setValue('hitLocations',
            // @ts-expect-error This the only way currently to not force every single PC to have a Tail
            calculatedHitLocations.map(loc => ({
                ...loc,
                armor: '',
                hpHistory: [],
                apHistory: [],
            })),
        );
    };

    useEffect(() => {
        const chars = characteristics.reduce((acc, curr) => {
            acc[curr.name as MythrasStdCharacteristicType] = curr.original;
            return acc;
        }, {} as Record<MythrasStdCharacteristicType, number>);

        const calculatedAttributes = calculateAttributes(chars, form.watch('personal.species'));
        const calculatedHitLocations = calculateHitLocations(chars, form.getValues('personal.species'));

        // Convert num to string
        form.setValue(
            'attributes',
            Object.entries(calculatedAttributes).map(([name, value]) => ({
                name: name as MythrasStdAttributeType,
                original: String(value),
                current: String(value),
            })),
        );

        form.setValue(
            'hitLocations',
            // @ts-expect-error This the only way currently to not force every single PC to have a Tail
            calculatedHitLocations.map(loc => ({
                ...loc,
                armor: '',
                hpHistory: [],
                apHistory: [],
            })),
        );

        console.log('Calculated Attributes (raw):', calculatedAttributes);
        console.log('Converted Attributes:', Object.entries(calculatedAttributes).map(([n, v]) => ({ name: n, value: String(v) })));

    }, [characteristics, form]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>{form.watch('personal.species')}</div> {/*I should remove this later*/}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                    {characteristics.map((char, index) => (
                        <FormField
                            key={char.name}
                            control={form.control}
                            name={`characteristics.${index}.original`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="capitalize">
                                        {char.name.replace(/([A-Z])/g, ' $1').trim()}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            className="w-full "
                                            min="1"
                                            max="99"
                                            value={field.value}
                                            onChange={(e) => {
                                                const value = Math.max(1, Math.min(99, Number(e.target.value)));
                                                field.onChange(value);
                                                form.setValue(`characteristics.${index}.current`, value);
                                            }}
                                            onBlur={handleCalculate} /*might cause performance, unlikely but might*/
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                {/*Testing purposes, but this button might be needed if the onBlur makes the website's server overloaded, I'll check it later*/}
                {/*<Button
                    type="button"
                    onClick={handleCalculate}
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                >
                    Calcular Atributos
                </Button>*/}

                {/* Display calculated attributes */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Atributos</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {form.watch('attributes').map((attr) => (
                            <div key={attr.name} className="border p-3 rounded-lg">
                                <p className="text-xs sm:text-sm md:text-base font-medium capitalize">
                                    {attr.name.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-lg sm:text-sm md:text-base font-semibold truncate">{attr.original}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Hit Locations</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {form.watch('hitLocations').map((attr) => (
                            <div key={attr.location} className="border p-3 rounded-lg">
                                <p className="text-xs sm:text-sm md:text-base font-medium capitalize">
                                    {attr.location.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-lg sm:text-sm md:text-base font-semibold truncate">{attr.hp}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <Button type="button" variant="ghost" onClick={onBack}>
                        Voltar
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        Próximo
                    </Button>
                </div>
            </form>
        </Form>
    );
};