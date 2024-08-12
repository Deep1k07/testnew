'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import CreateCBModal from './CreateCBModal'

const CreateCbButton = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='flex justify-end'>
      {/* <Button onClick={() => setShowModal(true)}>Create CB</Button> */}
      {showModal && <CreateCBModal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  )
}

export default CreateCbButton
