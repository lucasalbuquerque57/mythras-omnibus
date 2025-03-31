'use server';

import { signOut } from '@authMain';

export const logout = async () => {
    // this file is intended IF some server stuff needs to be done while the user logs out
    // like clear some info, I will not use it now, but could be useful in the future
    // to use this I should just simple call this logout function inside a onClick function
    //
    /* Usage example in a client side page:
    *
    *  const onClick = () => {
    *      logout();
    *  };
    *
    * */

    await signOut();
};