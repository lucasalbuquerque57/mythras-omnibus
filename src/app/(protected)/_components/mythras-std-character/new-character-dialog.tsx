'use client';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useEffect, useState, useTransition} from "react"; // Added useEffect import

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
//import {MythrasDataSchema} from "@/schemas/characters/mythras-std";
import {CreateMythrasStdCharacter} from "@/actions/create-mythras-std-character";
import {MythrasCreationSchema} from "@/schemas/characters/mythras-std/character-creation"; // Import the system config


export const NewMythrasStdCharacterDialog = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();

    const form = useForm<z.infer<typeof MythrasCreationSchema>>({
        resolver: zodResolver(MythrasCreationSchema),
        defaultValues: {
        },
    });

    const onSubmit = (values: z.infer<typeof MythrasCreationSchema>) => {
        if (!user) {
            return setError("You must be logged in to create a character.");
        }

        console.log(values);
        setError('');
        setSuccess('');

        startTransition(() => {
            if (user.id != null) {
                CreateMythrasStdCharacter(values, user.id)
                    .then((data) => {
                        setError(data.error);
                        setSuccess(data.success);
                    })
                    .catch((error) => {
                        // Log the full error object for debugging
                        console.error("Character creation failed:", error);
                        setError(
                            error.message ||
                            "An unexpected error occurred. Check the console for details.",
                        );
                    });
            }
        });
    };

    useEffect(() => {
        console.log(form.formState.errors);
    }, [form.formState.errors]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Novo personagem</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                                name='personal.name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome do personagem</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='José'
                                                type='text'
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='personal.species'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Raça</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} >
                                                <FormControl className='w-full'>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione uma raça" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='Human' >Humano</SelectItem>
                                                    <SelectItem value='Dwarf'>Anão</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <DialogFooter className="flex justify-between items-center w-full">
                            <Label className="text-left">Jogador: <p className='text-muted-foreground'>{user?.name}</p></Label>
                            <Button className="ml-auto" disabled={isPending} type='submit'>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
