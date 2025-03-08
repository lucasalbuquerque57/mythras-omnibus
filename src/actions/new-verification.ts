'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/util/user';
import { getVerificationTokenByToken } from '@/util/verification-token';

export const newVerification = async (token: string)=> {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken ){
        return { error: 'Token de verificação não existe!' };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token expirado!' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser){
        return { error: 'E-mail não existe!' };
    }

    await db.user.update({
        where: { id: existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {id: existingToken.id},
    });

    return { success: 'E-mail verificado!' };

}