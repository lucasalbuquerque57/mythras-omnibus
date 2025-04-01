import React from 'react';

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center h-screen text-gray-100'>
      {children}
    </div>
  );
};
export default AuthLayout;