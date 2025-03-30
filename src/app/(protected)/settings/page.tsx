'use client';

import { signOut } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import {NewCampaignDialog} from "@/app/(protected)/_components/campaign/new-campaign-dialog";
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";
import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";

const SettingsPage = () => {
    const user = useCurrentUser();
    const onClick = () => {
        signOut();
    };

    return (
        <div>
            <NavBar/>
            {/*<button onClick={onClick} type='submit'>
                Sair
            </button>*/}
            <NewCampaignDialog/>
            <NewCharacterWizard/>
        </div>
    );
};

export default SettingsPage;
