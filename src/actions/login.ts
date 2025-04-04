'use server';

import * as z from 'zod';


import { LoginSchema } from '@/schemas/users';
import {db} from '@/lib/db';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from '@authMain';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/util/user';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/tokens';
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/util/two-factor-token';
import {getTwoFactorConfirmationByUserId} from "@/util/two-factor-confirmation";



export const login = async (values: z.infer<typeof LoginSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  LoginSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!',
        };
    }
    const {email, password, code} = validatedFields.data;
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

    if (existingUser.isTwoFactorEnabled && existingUser.email){
        if (code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken){
                return { error: 'Código inválido!' };
            }

            if (twoFactorToken.token !== code){
                return { error: 'Código inválido!' };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired){
                return { error: 'Código expirado!' };
            }

            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if (existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });

        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser.email);
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );

            return { twoFactor: true };
        }
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
                    return {error: 'Credenciais inválidas!'};
                default:
                    return { error: 'Algo deu errado...'};
            }
        }
        throw error;
    }
};