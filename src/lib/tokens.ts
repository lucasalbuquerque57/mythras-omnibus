import { v4 as uuidv4 } from 'uuid';

import { db } from '@/lib/db';
import {getVerificationTokenByEmail} from "@/lib/verification-token";

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