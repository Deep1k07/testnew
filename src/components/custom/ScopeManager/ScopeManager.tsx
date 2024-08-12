"use client"

import React from 'react'
import ScopeManagerTableList from './ScopeManagerTableList'
import SkeletionTable from '../Skelton/Skelton'


const ScopeManager = ({ BaList, isLoading }: any) => {
    return (
        <div className='bg-white shadow-md rounded-md'>
            <div className='flex gap-x-4 py-4 px-3 border-b-2  border-gray-500'>
                {/* <Button>First Pending Scope</Button>
                <Button>Repeat Pending Scope</Button> */}
                <div className='font-bold'>
                    All Scopes

                </div>
            </div>
            {
                isLoading ? <SkeletionTable count={8} /> : <ScopeManagerTableList data={BaList?.clients} />
            }
        </div>
    )
}

export default ScopeManager