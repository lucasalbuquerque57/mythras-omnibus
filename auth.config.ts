import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';

import  Github  from 'next-auth/providers/github';
import  Discord  from 'next-auth/providers/discord';

import Credentials from 'next-auth/providers/credentials';
import  {LoginSchema} from "@/schemas/users";
import {getUserByEmail} from "@/util/user";


export default { providers: [
    Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET,
    }),
    Credentials({
        async authorize(credentials){
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success){
                const { email, password} = validatedFields.data;

                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) return user;

            }
            return null;
        }
    }),
    ] } satisfies NextAuthConfig;