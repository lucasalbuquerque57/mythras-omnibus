'use server';

import * as bcrypt from 'bcryptjs';
import * as z from 'zod';
import {RegisterSchema} from '@/schemas/users';
import {db} from '@/lib/db';
import {getUserByEmail} from '@/util/user';
import {generateVerificationToken} from '@/lib/tokens';
import {sendVerificationEmail} from '@/lib/mail';

export const register = async (values: z.infer<typeof RegisterSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  RegisterSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!',
        };
    }
    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            error: 'E-mail já está sendo usado',
        };
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    await  sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'E-mail de confirmação enviado!' };
};