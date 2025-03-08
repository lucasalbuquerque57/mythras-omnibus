'use server'

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { ResetPasswordSchema } from '@/schemas/users';

import { getPasswordResetByToken } from '@/util/password-reset-token';
import { getUserByEmail } from '@/util/user';

export const newPassword = async (
    values: z.infer<typeof ResetPasswordSchema>,
    token?: string | null,
    ) => {
    if (!token) {
        return { error: 'Cadê o token?' }
    }

    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Campo inválido!'};
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetByToken(token);

    if (!existingToken) {
        return { error: 'Token inválido!' }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: 'Token expirado!' }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: 'E-mail não existe!' }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: 'Senha atualizada!' };
}