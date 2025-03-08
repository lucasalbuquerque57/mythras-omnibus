import React from 'react';

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center h-screen text-gray-100'>
      {children}
    </div>
  );
};
export default AuthLayout;
// bg-gradient-to-tr from-violet-900 to-violet-950
// bg-gradient-to-tr from-preta to-firefox1