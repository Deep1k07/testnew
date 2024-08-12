'use client'
// import { useRouter } from 'next/router'
import { fetcher } from '@/utils/fetcher'
import React from 'react'
import useSWR from 'swr'

const ClientDetailsPage = ({ params }: { params: { clientID: string } }) => {

   const {data: client} = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/baManager/client/${params?.clientID}`,fetcher)

   console.log("client", client)
   return (
      <div className='bg-white shadow-md rounded-md '>
         <div className='border-b-2  border-gray-500'>
            <h3 className='text-base text-black font-semibold pt-4 pb-4 px-3'>Details of  Organization</h3>
         </div>
         <div className='mt-5 pb-4 px-3'>
            <div className='flex gap-x-4'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Name of Organization</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.name || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Address</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.address || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Scope</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.scope || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Standards</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.standard || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">CB Name</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.cb_name || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Ab Name</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.ab_name || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Ba Name</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.ba_name || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]"> Drive Link</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.drive_link || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Rate</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.rate || "..."}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">No of Employees</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.employee_count || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Email</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.email || ""}</div>
            </div>
            <div className='flex gap-x-4 mt-3'>
               <div className="left_part text-sm font-medium text-gray-600 min-w-[195px]">Language of Certificate</div>
               <div className="right_part text-sm text-gray-500">{client?.data?.cerificate_language || ""}</div>
            </div>
         </div>
      </div>
   )
}

export default ClientDetailsPage
