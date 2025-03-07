'use client';

import {useState, useTransition} from 'react';
import * as z from 'zod';

import { zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {LoginSchema, ResetInfoSchema} from '@/schemas/users';
import {CardWrapper } from '@/components/auth/card-wrapper';
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
import {reset} from '@/actions/reset-user-info';



export const ResetForm = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetInfoSchema>>({
      resolver: zodResolver(ResetInfoSchema),
      defaultValues: {
          email: '',
      },
  });

  const onSubmit = (values: z.infer<typeof ResetInfoSchema> ) => {
      setError('');
      setSuccess('');

      startTransition(() => {

              reset(values)
                  .then((data) => {
                      setError(data?.error);
                      setSuccess(data?.success);
                  });
      });

  };

  return (
      <CardWrapper
          headerLabel='Esqueceu sua senha?'
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

                </div>
                <FormError message={error} />
                <FormSuccess message={success}/>
                <Button
                    disabled={isPending}
                    type='submit'
                    className='w-full'
                >
                    Enviar e-mail de confirmação
                </Button>
            </form>
        </Form>
      </CardWrapper>
  );
};