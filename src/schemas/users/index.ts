import * as z from 'zod';

const usernameValidation = z.string()
    .min(3, 'Nome de usuário precisa ter pelo menos 3 caracteres')
    .max(20, 'Nome de usuário não pode ultrapassar 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nome de usuário só pode conter maiúsculas, minúsculas e underlines');

const passwordValidation = z.string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
    .max(20, 'Senha não pode exceder 20 caracteres');

// TODO: Check this later if it is working fine
const emailValidation = z.string()
        .email('Endereço de e-mail inválido')
        .optional();

// used to reset the password
export const ResetPasswordSchema = z.object({
    password: passwordValidation,
});

// used to reset email
export const ResetInfoSchema = z.object({
    email: emailValidation,
});

export const LoginSchema = z.object({
    email: emailValidation,
    password: passwordValidation,
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    name: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
});

/*
import * as z from 'zod';

// Validações básicas
const usernameValidation = z.string()
    .min(3, 'Nome de usuário precisa ter pelo menos 3 caracteres')
    .max(20, 'Nome de usuário não pode ultrapassar 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nome de usuário só pode conter maiúsculas, minúsculas e underlines');

const emailValidation = z
    .union([
        z.string().email('Endereço de e-mail inválido'),
        z.literal(''), // Permite string vazia
    ])
    .optional()
    .transform(val => val === '' ? undefined : val); // Converte string vazia para undefined

const passwordValidation = z.string()
    .min(4, 'Senha precisa ter pelo menos 4 caracteres')
    .max(20, 'Senha não pode exceder 20 caracteres');

// Schema de Login
export const LoginSchema = z.object({
    identifier: z.union([
        z.string().email('Endereço de e-mail inválido'),
        usernameValidation,
    ]).superRefine((val, ctx) => {
        if (!val.includes('@') && val.length < 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Nome de usuário precisa ter pelo menos 3 caracteres',
            });
        }
    }),
    password: passwordValidation,
});

// Schema de Registro
export const RegisterSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
}).refine(data => {
    // Apenas valida se o e-mail existir
    if (!data.email) return true;
    return !data.email.includes(data.name);
}, {
    message: 'E-mail não pode conter o nome de usuário',
    path: ["email"],
});
*/
