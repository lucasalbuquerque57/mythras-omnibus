import React from 'react';

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center h-screen bg-gradient-to-tr from-violet-900 to-violet-950 text-gray-100'>
      {children}
    </div>
  );
};
export default AuthLayout;
