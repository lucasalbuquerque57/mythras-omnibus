import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/util/verification-token';
import { getPasswordResetByEmail } from '@/util/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/util/two-factor-token';

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 250); // 15 minutes

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    return twoFactorToken;
}

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
            // @ts-ignore might cause an error
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