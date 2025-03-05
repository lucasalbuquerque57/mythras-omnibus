'use server';

import * as z from 'zod';
import {LoginSchema} from '@/schemas/users/index';

export const login = async (values: z.infer<typeof LoginSchema>) => { // ✅ Added `async`
    console.log(values);
    const validatedFields =  LoginSchema.safeParse(values);
    if (!validatedFields.success){
        return {
            error: 'Campos inválidos!'
        }
    }
    else {
        return { success: 'E-mail enviado!' };
    }

}