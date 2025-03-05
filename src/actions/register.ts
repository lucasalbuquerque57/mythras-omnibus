'use server';

import bcrypt from 'bcrypt';
import * as z from 'zod';
import {RegisterSchema} from '@/schemas/users';
import {db} from '@/lib/db';

export const register = async (values: z.infer<typeof RegisterSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  RegisterSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!',
        };
    }
    const {username, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return {
            error: 'E-mail já está sendo usado',
        };
    }

    await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    // TODO: send a verification token e-mail

    return { success: 'E-mail enviado!' };
};