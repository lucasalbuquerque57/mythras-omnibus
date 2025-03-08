import {Resend} from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Código de verificação de dois fatores',
        html: `<p>Seu código de verificação de dois fatores é: ${token}</p>`
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    // TODO: Change the URL for production
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Trocar sua senha',
        html: `<p>Clique <a href='${resetLink}'>aqui</a> para trocar seu email.</p>`
    });
};


export const sendVerificationEmail = async (email: string, token: string) => {
    // TODO: Change the URL for production
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirme seu e-mail',
        html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail.</p>`
    });
};