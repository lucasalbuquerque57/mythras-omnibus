'use client';

import {useState, useTransition} from 'react';
import * as z from 'zod';
import { zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

import { ResetPasswordSchema } from '@/schemas/users';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { newPassword } from '@/actions/new-password';



export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
          password: '',
      },
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema> ) => {
      setError('');
      setSuccess('');

      startTransition(() => {

              newPassword(values, token)
                  .then((data) => {
                      setError(data?.error);
                      setSuccess(data?.success);
                  });
      });

    };

    return (
      <CardWrapper
          headerLabel='Insira a nova senha'
          backButtonLabel='De volta para Login'
          backButtonHref='/auth/login'
      >
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
            >
                <div className='space-y-4'>
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
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>
                <FormError message={error} />
                <FormSuccess message={success}/>
                <Button
                    disabled={isPending}
                    type='submit'
                    className='w-full'
                >
                    Trocar senha
                </Button>
            </form>
        </Form>
      </CardWrapper>
  );
};