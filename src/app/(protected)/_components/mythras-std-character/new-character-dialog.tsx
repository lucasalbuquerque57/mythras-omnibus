'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useState, useTransition } from 'react';
import { MythrasDataSchema } from '@/schemas/characters/mythras-std';
import { createMythrasCharacter } from '@/actions/create-mythras-character';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { z } from 'zod';
import { Label } from '@/components/ui/label';

export const NewMythrasStdCharacterDialog = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
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

    // Update the onSubmit handler
    const onSubmit = (values: z.infer<typeof MythrasDataSchema>) => {
        startTransition(() => {
            createMythrasCharacter(values)
                .then((response) => {
                    if (response?.error) {
                        setError(response.error);
                        setSuccess(undefined);
                    } else if (response?.success) {
                        setSuccess(response.success); // Changed from response.message
                        setError(undefined);
                        console.log('Character ID:', response.characterId);
                    }
                })
                .catch((error) => {
                    console.error('Submission error:', error);
                    setError('Failed to submit form!');
                });
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Novo personagem</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Criar novo personagem</DialogTitle>
                    <DialogDescription>
                        Adicione alguns detalhes iniciais de seu personagem
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <DialogFooter className='flex justify-between items-center w-full'>
                            <Label className='text-left'>
                                Jogador: <p className='text-muted-foreground'>{user?.name}</p>
                            </Label>
                            <Button className='ml-auto' disabled={isPending} type='submit'>
                                Criar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};