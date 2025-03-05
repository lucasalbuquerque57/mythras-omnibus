import {auth, signOut} from '@authMain';
import {getSession} from "next-auth/react";

const SettingsPage = async () => {
    const session = await auth();
    return (
        <div>
          {JSON.stringify(session)}
            <form action={async()=> {
                'use server';

                await signOut();
            }}>
                <button type='submit'>Sair</button>
            </form>
        </div>
    );
};

export default SettingsPage;
