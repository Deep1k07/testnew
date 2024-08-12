"use client"

import React from 'react'
import ScopeDetailsForm from './ScopeDetailsForm'

async function page({ params }: { params: { id: string } }) {
    const id = params.id
    return (
        <ScopeDetailsForm id={id}/>
    )
}

export default page