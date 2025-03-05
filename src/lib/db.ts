import { PrismaClient } from '@prisma/client';

declare global {
    // noinspection ES6ConvertVarToLetConst
    var prisma: PrismaClient | undefined;
}

// global is not affected by hotReload, I should keep this in mind (I'll forget for sure)
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}