import { auth } from '@authMain';

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
};