'use client'

import React from 'react'
import RateCart from './RateCart';

const page = ({params}: {params:{name: string}}) => {
    let {name} = params;
  return (
    <div>
      <RateCart name={name} />
    </div>
  )
}

export default page