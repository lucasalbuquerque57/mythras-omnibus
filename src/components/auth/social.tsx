'use client';

import { FaGithub } from 'react-icons/fa';
import { FaDiscord } from 'react-icons/fa';
import {Button} from "@/components/ui/button";

export const Social = () => {
    return (
        <div className='flex items-center w-full gap-x-2'>
            <Button
                size='lg'
                className='w-1/2'
                variant='outline'
                onClick={() => {}}
            >
                <FaGithub className='h-5 w-5' />
            </Button>
            <Button
                size='lg'
                className='w-1/2'
                variant='outline'
                onClick={() => {}}
            >
                <FaDiscord className='h-5 w-5' />
            </Button>
        </div>
    )
}