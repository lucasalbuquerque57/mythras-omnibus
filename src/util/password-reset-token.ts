import { db } from '@/lib/db';

export const getPasswordResetByToken = async (token: string) => {
    try {
      const passwordResetToken = await db.passwordResetToken.findUnique({
          where: {token},
      })
        return passwordResetToken;
    } catch{
        return null;
    }
}


export const getPasswordResetByEmail = async (email: string | undefined) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {email},
        })
        return passwordResetToken;
    } catch{
        return null;
    }
}