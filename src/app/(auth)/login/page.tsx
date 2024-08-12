'use client'

import LoginForm from '@/components/custom/Login/Login'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100">
      <div className='bg-white shadow-md rounded-lg flex flex-col w-full max-w-[500px] pb-5'>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-dark">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage
