import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/lib/verification-token';
import { getPasswordResetByEmail } from '@/util/password-reset-token';

export const generatePasswordResetToken = async (email: string | undefined) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            // @ts-ignore Yes it is possibly null, but that's ok
            where: { id: existingToken.id }
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}

// Those two are separated mostly for security, just like in the prisma schema

export const generateVerificationToken = async (email: string | undefined) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            // @ts-ignore might cause an error
            email,
            token,
            expires,
        }
    });
    return verificationToken;
}