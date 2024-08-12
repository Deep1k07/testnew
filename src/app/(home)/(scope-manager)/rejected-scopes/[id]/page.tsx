'use client'

import React from 'react'
import RejectedForm from './RejectedForm'

const page = ({params}:{params: {id: string}}) => {
    let id = params.id
  return (
    <div>
      <RejectedForm id={id}/>
    </div>
  )
}

export default page
