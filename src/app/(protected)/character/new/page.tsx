'use client';

import {NewCharacterWizard} from "@/app/(protected)/_components/mythras-std-character/new-character-wizard";
const NewMythrasCharacter = () => {

  return (
      <div> {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2"> */}
        <NewCharacterWizard/>
      </div>
  );
};

export default NewMythrasCharacter;
