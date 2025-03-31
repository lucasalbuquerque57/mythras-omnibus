'use client';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useCurrentUser} from "@/hooks/use-current-user";
import {CreateCampaign} from "@/actions/create-campaign";
import {useEffect, useState, useTransition} from "react"; // Added useEffect import

import {CampaignSchema} from "@/schemas/campaigns";

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
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";


export const NewCampaignDialog = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const user = useCurrentUser();

    const form = useForm<z.infer<typeof CampaignSchema>>({
        resolver: zodResolver(CampaignSchema),
        defaultValues: {
            name: '',
            description: '',
            system: "MYTHRAS_STD",
            directorId: user?.id,
        },
    });

    const onSubmit = (values: z.infer<typeof CampaignSchema>) => {
        console.log(values);
        setError('');
        setSuccess('');

        startTransition(() => {
            CreateCampaign(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : 'Um erro inesperado aconteceu!';
                    setError(errorMessage);

                    console.error('Erro ao criar a campanha:', error);
                });
        });
    };

    useEffect(() => {
        console.log(form.formState.errors);
    }, [form.formState.errors]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background
                transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Nova campanha
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar nova campanha</DialogTitle>
                    <DialogDescription>
                        Adicione alguns detalhes gerais sobre a sua nova campanha
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
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome da campanha</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder='4 Bernardos e o Denis Oliveira'
                                                type='text'
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Lorem ipsum"
                                                className=""
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='system'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sistema</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                <FormControl className='w-full'>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um sistema de RPG" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="MYTHRAS_STD">Mythras Padrão</SelectItem>
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
                            <Label className="text-left">Diretor: <p className='text-muted-foreground'>{user?.name}</p></Label>
                            <Button className="ml-auto" disabled={isPending} type='submit'>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};