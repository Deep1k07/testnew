'use client'
import RegisterForm from '@/components/custom/Register/Register';
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className='flex flex-col items-center justify-center rounded-lg shadow-md  bg-white w-full max-w-[500px] pb-5'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-[#33666D]">
          Register
        </h2>
      </div>

      <RegisterForm/>
      </div>
    </div>
  );
}

export default RegisterPage
