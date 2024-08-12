
'use client'

import React from 'react'
import InputForm from './InputForm';

const Page = ({ params }: { params: { cbName: string } }) => {
  const { cbName } = params;
  return (
    <InputForm cbName={cbName}/>
  )
}

export default Page
