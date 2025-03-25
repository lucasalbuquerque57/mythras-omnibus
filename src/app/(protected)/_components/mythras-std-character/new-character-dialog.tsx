'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useState, useTransition } from 'react';
import { MythrasCreationSchema } from '@/schemas/characters/mythras-std/character-creation';
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
import {z} from 'zod';
import { Label } from '@/components/ui/label';


export const NewMythrasStdCharacterDialog = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof MythrasCreationSchema>>({
        resolver: zodResolver(MythrasCreationSchema),
        defaultValues: {
            userId: user?.id || '',
            system: 'MYTHRAS_STD',
            step: 1,
            data: {
                personal: {
                    name: '',
                    gender: '',
                    species: '',
                    culture: '',
                    homeland: '',
                    career: '',
                },
            },
        },
    });

    const onSubmit = (values: z.infer<typeof MythrasCreationSchema>) => {
        startTransition(() => {
            createMythrasCharacter(values)
                .then((response) => {
                    if (response.status === 'error') {
                        setError(response.error);
                        setSuccess(undefined);
                    } else {
                        setSuccess(response.message);
                        setError(undefined);
                        console.log('Character ID:', response.data.characterId);
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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='data.personal.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Character Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='José Felipe'
                                                className='w-full '
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Gender */}
                            <FormField
                                control={form.control}
                                name='data.personal.gender'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione o gênero' />
                                                </SelectTrigger>
                                            </FormControl>
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

                            {/* Species */}
                            <FormField
                                control={form.control}
                                name='data.personal.species'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Species</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione a espécie' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Human'>Humano</SelectItem>
                                                <SelectItem value='Dwarf'>Anão</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Culture */}
                            <FormField
                                control={form.control}
                                name='data.personal.culture'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Culture</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione a cultura' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Gallardo'>Gallardo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Homeland */}
                            <FormField
                                control={form.control}
                                name='data.personal.homeland'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Homeland</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='Goiabal'
                                                className='w-full'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Career */}
                            <FormField
                                control={form.control}
                                name='data.personal.career'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Career</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isPending}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Selecione a carreira' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Pedreiro'>Pedreiro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <DialogFooter className='flex justify-between items-center w-full'>
                            <Label className='text-left'>Jogador: <p className='text-muted-foreground'>{user?.name}</p></Label>
                            <Button className='ml-auto' disabled={isPending} type='submit'>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};