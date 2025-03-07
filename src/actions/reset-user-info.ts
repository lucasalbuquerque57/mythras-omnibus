'use server';

import * as z from 'zod';

import { ResetInfoSchema } from '@/schemas/users';
import { getUserByEmail } from '@/util/user';

export const reset = async (values: z.infer<typeof ResetInfoSchema>) => {
    const validatedFields = ResetInfoSchema.safeParse(values);;

    if (!validatedFields.success) {
        return { error: 'E-mail inválido!'};
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'E-mail não encontrado' };
    }

    // TODO: Generate token and send the confirmation email

    return { success: 'E-mail de confirmação enviado!'};

}

