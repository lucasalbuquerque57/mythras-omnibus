import {Resend} from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: `${process.env.EMAIL_SENDER_ADDRESS}`,
        to: email,
        subject: 'Código de verificação de dois fatores',
        html: `<p>Seu código de verificação de dois fatores é: ${token}</p>`,
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.PROD_URL}auth/new-password?token=${token}`;

    await resend.emails.send({
        from: `${process.env.EMAIL_SENDER_ADDRESS}`,
        to: email,
        subject: 'Trocar sua senha',
        html: `<p>Clique <a href='${resetLink}'>aqui</a> para trocar seu e-mail.</p>`,
    });
};


export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.PROD_URL}auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: `${process.env.EMAIL_SENDER_ADDRESS}`,
        to: email,
        subject: 'Confirme seu e-mail',
        html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail.</p>`,
    });
};