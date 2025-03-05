'use server';

import * as z from 'zod';

import { signIn} from "@authMain";
import {LoginSchema} from '@/schemas/users';
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  LoginSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!'
        }
    }
    const {email, password} = validatedFields.data;

    try {
        await signIn('credentials', {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT});
    } catch (error){
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: 'Credenciais inválidas!'}
                default:
                    return { error: 'Algo deu errado...'}
            }
        }
        throw error;
    }
}