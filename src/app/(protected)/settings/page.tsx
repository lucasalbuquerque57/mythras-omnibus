'use client';

import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
    const user = useCurrentUser();
    const onClick = () => {
        signOut();
    }

    return (
        <div>
            <button onClick={onClick} type='submit'>
                Sair
            </button>
        </div>
    );
};

export default SettingsPage;
