'use client'

import ScopeManager from '@/components/custom/ScopeManager/ScopeManager'
import { fetcher } from '@/utils/fetcher';
import React from 'react'
import useSWR from 'swr';

const Page = () => {
    const {data: getAllBa ,isLoading } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/baManager/client`,fetcher)

  return (
    <div>
      <ScopeManager BaList = {getAllBa} isLoading={isLoading} />
    </div>
  )
}

export default Page
