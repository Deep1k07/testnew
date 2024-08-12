'use client'
import React from 'react'
import ScopeApprovalForm from './ScopeApprovalForm'

const page = ({ params }: { params: { id: string } }) => {
    const {id} = params

  return (
    <div>
      <ScopeApprovalForm id={id} />
    </div>
  )
}

export default page
