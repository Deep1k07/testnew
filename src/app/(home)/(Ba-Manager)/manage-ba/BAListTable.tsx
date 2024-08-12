"use client"
import SkeletionTable from '@/components/custom/Skelton/Skelton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllBa } from '@/utils/apis'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
function BAListTable() {
    const [baList, setBaList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const session = useSession();
    const router = useRouter()
    useEffect(() => {
        const getAllBas = async () => {
            if (session?.data?.user) {
                const res = await getAllBa(session?.data?.user?._id)
                setBaList(res);
                setIsLoading(false)
            }
        }
        getAllBas()
    }, [session?.data]);
    return (
        <>
            {
                isLoading ? <SkeletionTable count={8} /> : <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold  whitespace-nowrap min-w-[100px] w-[100px] ">S.No</TableHead>
                            <TableHead className="font-semibold  whitespace-nowrap min-w-[150px] ">Name of BA</TableHead>
                            <TableHead className="font-semibold  whitespace-nowrap min-w-[150px] ">Home Country</TableHead>
                            <TableHead className="font-semibold  whitespace-nowrap min-w-[150px] ">Created At</TableHead>
                            <TableHead className="font-semibold  whitespace-nowrap min-w-[133px] w-[133px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            baList?.map((ele: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{ele.name}</TableCell>
                                    <TableCell>{ele.country}</TableCell>
                                    <TableCell>{ele.createdAt ? moment(ele.createdAt).format("DD-MM-YYYY") : ""}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => router.push(`/manage-ba/${ele?.name}`)} >Rate Cart</Button>
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

export default BAListTable