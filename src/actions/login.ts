'use server';

import * as z from 'zod';

import { signIn } from '@authMain';
import { LoginSchema } from '@/schemas/users';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/util/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (values: z.infer<typeof LoginSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  LoginSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!'
        }
    }
    const {email, password} = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password){
        return { error: 'Usuário não encontrado!' };
    }

    // This can cause some security issues as it sends the verification e-mail BEFORE it verifies if the password is correct
    // So, an attacker can try to discover which random e-mails do have an account in this website (if that account's email is not verified)
    if (!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: 'E-mail de confirmação enviado!' };
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT});
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