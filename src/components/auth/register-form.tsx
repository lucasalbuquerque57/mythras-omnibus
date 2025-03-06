"use client";

import {useState, useTransition} from 'react';
import * as z from 'zod';

import { zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {RegisterSchema} from '@/schemas/users';
import {CardWrapper} from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";



export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
          email: '',
          name: '',
          password: '',
      },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema> ) => {
      setError('');
      setSuccess('');

      startTransition(() => {
              register(values)
                  .then((data) => {
                      setError(data.error);
                      setSuccess(data.success);
                  });
      });

  };

  return (
      <CardWrapper
          headerLabel='Cadastrar-se'
          backButtonLabel='Já tenho uma conta'
          backButtonHref='/auth/login'
          //showSocial
      >
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
                                <FormLabel>Nome de Usuário</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='(seu nome, não o do personagem)'
                                        type='text'
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value || ''} // Converte undefined para string vazia
                                        placeholder="seu@email.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='****'
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button
                    disabled={isPending}
                    type='submit'
                    className='w-full'
                >
                    Cadastrar
                </Button>
            </form>
        </Form>
      </CardWrapper>
  );
};