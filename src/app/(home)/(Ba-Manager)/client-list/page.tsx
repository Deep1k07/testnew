import React from 'react'
import Tablebody from '@/components/custom/ClientTable/Table'


const ClientList = () => {

  let headerList = [
    'Name of Organization',
    'Address of Organization',
    // 'Scope',
    // 'Phone Number',
    // 'Website',
    'Standard',
    // 'CB Name',
    // 'AB Name',
    // 'BA Name',
    'Drive Link',
    // 'Rate',
    // 'Number of Employees',
    'Email Address',
    'Language og Certificate'
  ]


  return (
    <div className='bg-white shadow-md rounded-md'>
      <div className='border-b-2  border-gray-500'>
        <h3 className='text-base text-gray-700 font-semibold pt-4 pb-4 px-3 text-black'>All Client List</h3>
      </div>
      <div className='pb-4 '>
        <Tablebody headerList={headerList} />
      </div>
    </div>

  )
}

export default ClientList
