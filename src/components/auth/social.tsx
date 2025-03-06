'use client';

import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import {Button} from "@/components/ui/button";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

export const Social = () => {
    const onClick = (provider: "github" | "discord") => {
        signIn(provider, {
            callback: DEFAULT_LOGIN_REDIRECT,
        });
    }

    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size='lg'
                className='w-1/2'
                variant='outline'
                onClick={() => onClick("github")}
            >
                <FaGithub className='h-5 w-5' />
            </Button>
            <Button
                size='lg'
                className='w-1/2'
                variant='outline'
                onClick={() => onClick("discord")}
            >
                <FaDiscord className='h-5 w-5' />
            </Button>
        </div>
    )
}