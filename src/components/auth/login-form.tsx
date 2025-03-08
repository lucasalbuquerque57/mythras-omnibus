'use client';

import {useState, useTransition} from 'react';
import * as z from 'zod';

import { zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

import { LoginSchema} from '@/schemas/users';
import {CardWrapper} from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {FormError} from '@/components/form-error';
import {FormSuccess} from '@/components/form-success';
import {login} from '@/actions/login';
import Link from 'next/link';


export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
    ? 'Este e-mail já está sendo usado com outro provedor!'
    : '';


  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
          email: '',
          password: '',
      },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema> ) => {
      setError('');
      setSuccess('');

      startTransition(() => {
              login(values)
                  .then((data) => {
                      setError(data?.error);
                      setSuccess(data?.success);
                  });
      });

  };

  return (
      <CardWrapper
          headerLabel='Entrar'
          backButtonLabel='Não tem uma conta?'
          backButtonHref='/auth/register'
          showSocial
      >
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
            >
                <div className='space-y-4'>
                    {/*// TODO: Fazer uma tela de login alternativa usando username, ao invés de e-mail*/}
                    {/*<FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome de Usuário ou E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='Denis Oliveira'
                                        type='text'
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />*/}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder='denis@oliveira.com'
                                        type='email'
                                    />
                                </FormControl>
                                <FormMessage/>
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
                                        placeholder='******'
                                        type='password'
                                    />
                                </FormControl>
                                <Button
                                    size='sm'
                                    variant='link'
                                    asChild
                                    className='px-0 font-normal'
                                >
                                    <Link href={'/auth/reset'}>
                                        Esqueci minha senha
                                    </Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success}/>
                <Button
                    disabled={isPending}
                    type='submit'
                    className='w-full'
                >
                    Entrar
                </Button>
            </form>
        </Form>
      </CardWrapper>
  );
};