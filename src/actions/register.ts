'use server';

import * as z from 'zod';
import {RegisterSchema} from '@/schemas/users/index';

export const register = async (values: z.infer<typeof RegisterSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  RegisterSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!'
        }
    }
    else {
        return { success: 'E-mail enviado!' };
    }

}