'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

interface PersonalInfoStepProps {
    onSubmit: (values: z.infer<typeof MythrasDataSchema>) => void;
    isPending: boolean;
}

export const PersonalInfoStep = ({ onSubmit, isPending }: PersonalInfoStepProps) => {
    const user = useCurrentUser();
    const form = useForm<z.infer<typeof MythrasDataSchema>>({
        resolver: zodResolver(MythrasDataSchema),
        defaultValues: {
            personal: {
                name: '',
                player: user?.id || '',
                gender: '',
                species: '',
                culture: '',
                homeland: '',
                career: '',
                age: '20', // Default age as string
            },
            characteristics: [],
            attributes: [],
            hitLocations: [],
            skills: {
                standard: [],
                magic: [],
                professional: [],
            },
            passion: [],
        },
    });



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className='space-y-4'>
                            {/* Personal Information Fields */}
                            <FormField
                                control={form.control}
                                name='personal.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do Personagem</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='José Felipe'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='personal.gender'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gênero</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o gênero" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Man'>Masculino</SelectItem>
                                                <SelectItem value='Woman'>Feminino</SelectItem>
                                                <SelectItem value='Non-Binarie'>Não Binário</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='personal.species'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Espécie</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a espécie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Human'>Humano</SelectItem>
                                                <SelectItem value='Dwarf'>Anão</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='personal.culture'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cultura</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a cultura" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Gallardo'>Gallardo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='personal.homeland'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Terra Natal</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='Goiabal'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='personal.career'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Carreira</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione a carreira" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='Pedreiro'>Pedreiro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                Próximo
                            </Button>
                        </div>
                    </form>
                </Form>
    );
};