'use client';

import { useRouter } from 'next/navigation';
import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";
import {NewMythrasStdCharacterForm} from "@/app/(protected)/_components/mythras-std-character/character-creation-form";


export default function NewCharacterPage() {
    const router = useRouter();


    return (
        /*<div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Create New Character</h1>

            <div className="space-y-8">


                 System Selection

            </div>
        </div>*/
        <div>
            <NavBar/>
            <NewMythrasStdCharacterForm/>
        </div>
    );
}