import {CardWrapper} from "@/components/auth/card-wrapper";
import {TriangleAlert} from 'lucide-react';


export const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel=''
            backButtonHref='/auth/login'
            backButtonLabel='Voltar para o Login'
        >
            <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
                <TriangleAlert className='h-4 w-4' />
                <p>Epa! Algo deu errado!</p>
            </div>
        </CardWrapper>
    );
};