'use client'

import React from 'react'
import UserForm from './UserForm';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
interface Role {
  _id: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}
interface RolesResponse {
  data: Role;
}

const EditRolePage = ({params}: {params: {userId: string}}) => {
    const {userId} = params;
    const {data: user} = useSWR<RolesResponse>(`${process.env.NEXT_PUBLIC_API_URI}/admin/role/${userId}`,fetcher)
  return (
    <div className='bg-white shadow-md rounded-lg py-4'>
      <UserForm id={userId} user={user?.data}/>
    </div>
  )
}

export default EditRolePage