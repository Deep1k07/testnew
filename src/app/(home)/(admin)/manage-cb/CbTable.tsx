'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
    Pencil,
} from "lucide-react"
import { Button } from '@/components/ui/button'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import SkeletionTable from '@/components/custom/Skelton/Skelton'


const CBTable = ({ headerList }: any) => {
    const { data, isLoading } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb`, fetcher);
    const router = useRouter();
    return (
        <>
            {
                isLoading ? <SkeletionTable count={8} /> : <Table >
                    <TableHeader>
                        <TableRow>
                            {
                                headerList?.map((item: any, idx: any) => (
                                    <TableHead key={idx} className={`font-semibold whitespace-nowrap min-w-[150px] ${idx == 3 ? "min-w-[70px]  w-[70px]" : ""}`}>{item}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.CbList?.map((item: any, idx: any) => (
                                <TableRow
                                    key={idx}
                                >
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{item?.cb || ''}</TableCell>
                                    <TableCell>{item?.ab[0].name || ''}</TableCell>
                                    <TableCell className='cursor-pointer' onClick={() => {
                                        router.push(`/manage-cb/${item?.cb}`)
                                    }}>
                                        <Button><Pencil size={16} /></Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            }

        </>
    )
}
export default CBTable
