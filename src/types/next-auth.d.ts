import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    role: 'ADMIN' | 'DIRECTOR' | 'USER';
}

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}