'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useTransition } from "react";
import { MythrasCreationSchema } from "@/schemas/characters/mythras-std/character-creation";
import { createMythrasCharacter } from "@/actions/create-mythras-character";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {z} from "zod";

export const NewMythrasStdCharacterForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof MythrasCreationSchema>>({
        resolver: zodResolver(MythrasCreationSchema),
        defaultValues: {
            userId: user?.id || "",
            system: "MYTHRAS_STD",
            step: 1,
            data: {
                personal: {
                    name: "",
                    gender: "",
                    species: "",
                    culture: "",
                    homeland: "",
                    career: "",
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="data.personal.name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Character Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Aragorn"
                                        className="w-full md:w-1/2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="data.personal.gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl className="w-full md:w-1/2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Man">Masculino</SelectItem>
                                        <SelectItem value="Woman">Feminino</SelectItem>
                                        <SelectItem value="Non-Binarie">Não Binário</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Species */}
                    <FormField
                        control={form.control}
                        name="data.personal.species"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Species</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl className="w-full md:w-1/2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select species" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Human">Humano</SelectItem>
                                        <SelectItem value="Dwarf">Anão</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Culture */}
                    <FormField
                        control={form.control}
                        name="data.personal.culture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Culture</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl className="w-full md:w-1/2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select culture" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Gallardo">Gallardo</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Homeland */}
                    <FormField
                        control={form.control}
                        name="data.personal.homeland"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Homeland</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Goiabal"
                                        className="w-full md:w-1/2"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Career */}
                    <FormField
                        control={form.control}
                        name="data.personal.career"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Career</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={isPending}
                                >
                                    <FormControl className="w-full md:w-1/2">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select career" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Pedreiro">Pedreiro</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto"
                >
                    Create Character
                </Button>
            </form>
        </Form>
    );
};