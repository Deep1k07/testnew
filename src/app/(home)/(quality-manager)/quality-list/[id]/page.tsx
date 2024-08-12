"use client"

import React from 'react'
import QualityForm from './QualityForm'

const page = ({params}: {params: {id: string}}) => {
    const {id} = params;
  return (
    <div>
      <QualityForm id={id} />
    </div>
  )
}

export default page
