'use client';

import { ClimbingBoxLoader } from 'react-spinners';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

import { newVerification } from '@/actions/new-verification';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState} from 'react';

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const onSubmit = useCallback(() => {
        if (!token) {
            setError('Cadê o token de verificação?');
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError('Algo deu errado!');
            })
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (

        <CardWrapper
            headerLabel='Confirmando sua conta'
            backButtonLabel='Voltar para Login'
            backButtonHref='/auth/login'
        >
            <div className='flex w-full items-center justify-center'>
                {!success && !error && (
                    <ClimbingBoxLoader />
                )}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>

    )
}