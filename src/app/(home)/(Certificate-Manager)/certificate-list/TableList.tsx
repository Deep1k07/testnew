'use client'

import SkeletionTable from '@/components/custom/Skelton/Skelton';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fetcher } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import React from 'react'
import useSWR from 'swr';

function TableList() {
    const { data, isLoading } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/certificateManager`, fetcher)
    let responseData = data?.data
    const getTimeDifferenceInHours = (updatedAt: Date, decimals: number = 2): number => {
        const now = new Date();
        const timeDifference = now.getTime() - new Date(updatedAt).getTime();
        const hours = timeDifference / (1000 * 60 * 60);
        return parseFloat(hours.toFixed(decimals));
    };
    const router = useRouter();
    return (
        <div>
            {
                isLoading ? <SkeletionTable count={8} /> : <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Quality Manager Name</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Ba Manger</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Company Name</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Standard</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Quality Approve Dates</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Scope Manager</TableHead>
                            <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Process Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            responseData ? responseData?.map((ele: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>Quality Manager Name</TableCell>
                                    <TableCell>{ele.ba_manager}</TableCell>
                                    <TableCell>{ele.name}</TableCell>
                                    <TableCell>{ele.standard}</TableCell>
                                    <TableCell>{getTimeDifferenceInHours(ele?.qualityApprovedDate) + ' hrs'}</TableCell>
                                    <TableCell>{ele.scope_manager}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => router.push(`certificate-list/${ele?._id}`)}>Action</Button>
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
            }

        </div>
    )
}

export default TableList