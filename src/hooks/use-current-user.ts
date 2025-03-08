import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
}

// This is just so I don't need to type in session.data.user every single time I need to do something inside the app