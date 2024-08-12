'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import moment from 'moment'
import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'

const RejectedList = () => {
    const {data} = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/scopeManager`,fetcher)
    const scopes = data?.data
    const router = useRouter()
    return (
        <div>
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Scope Manger</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Ba Manger</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Company Name</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Standard</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Date of Application</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Delay Time</TableHead>
                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Process Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        scopes?.length > 0 ? scopes?.map((ele: any, ind: any) => (
                            <TableRow key={ind}>
                                <TableCell>{ele?.scope_manager || ""}</TableCell>
                                <TableCell>{ele?.ba_manager || ""}</TableCell>
                                <TableCell>{ele?.name || ""}</TableCell>
                                <TableCell>{ele?.standard || ""}</TableCell>
                                <TableCell>{ele?.createdAt ? moment(ele.createdAt).format("DD-MM-YYYY") : ""}</TableCell>
                                <TableCell>24hrs</TableCell>
                                <TableCell>
                                    <Button onClick={() => router.push(`quality-list/${ele?._id}`)}>Action</Button>
                                </TableCell>
                            </TableRow>
                        )
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">No data found</TableCell>
                        </TableRow>
                     )
                    }
  
                </TableBody>
            </Table>
        </div>
    )
}

export default RejectedList
