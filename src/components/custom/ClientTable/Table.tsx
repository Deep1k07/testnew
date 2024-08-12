'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fetcher } from '@/utils/fetcher'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const Tablebody = ({headerList}:any) => {
    const router = useRouter()
    const {data} = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/baManager/client`,fetcher)
  return (
    <Table >
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
              <TableRow>
                {
                    headerList?.map((item: any,idx:any)=>(
                        <TableHead key={idx} className="font-semibold  whitespace-nowrap min-w-[150px] ">{item}</TableHead>
                    ))
                }
              </TableRow>
          </TableHeader>
          <TableBody>
                  {
                      data?.clients?.length > 0 && data?.clients?.map((item: any, idx: any) => (
                          <TableRow 
                          key={idx}
                           className='cursor-pointer'
                            onClick={() => {
                            router.push(`/client-list/${item?._id}`)
                          }}
                          >
                              <TableCell>{item?.name || ''}</TableCell>
                              <TableCell>{item?.address || ''}</TableCell>
                              {/* <TableCell className="text-left">{item?.scope || ''}</TableCell> */}
                              {/* <TableCell className="text-left">{item?.phone || '11'}</TableCell> */}
                              <TableCell className="text-left">{item?.standard || ''}</TableCell>
                              {/* <TableCell className="text-left">{item?.cb_name || ''}</TableCell> */}
                              {/* <TableCell className="text-left">{item?.ab_name || ''}</TableCell> */}
                              {/* <TableCell className="text-left">{item?.ba_name || ''}</TableCell> */}
                              <TableCell className="text-left">{item?.drive_link || ''}</TableCell>
                              {/* <TableCell className="text-left">{item?.rate || ''}</TableCell> */}
                              {/* <TableCell className="text-left">{item?.employee_count || ''}</TableCell> */}
                              <TableCell className="text-left">{item?.email || ''}</TableCell>
                              <TableCell className="text-left">{item?.certificate_language || ''}</TableCell>
                              {/* <TableCell className="text-left">english</TableCell> */}
                          </TableRow>
                      ))
                  }
              </TableBody>
      </Table>
  )
}

export default Tablebody
