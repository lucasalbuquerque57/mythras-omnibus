'use client';

import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
const NewMythrasCharacter = () => {

  return (
      <div className="max-w-xl mx-auto p-4">
        <NewCharacterWizard/>
      </div>
  );
};

export default NewMythrasCharacter;
