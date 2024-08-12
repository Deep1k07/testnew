"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowDownToLine } from 'lucide-react'
import React from 'react'
function FinalCertificatePage({ responseData }: any) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[100px] w-[100px]">S.No</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">AB Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">BA Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Company Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Scope Manager</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Standard</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Process Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    responseData ?
                        responseData?.map((ele: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{ele.ab_name}</TableCell>
                                <TableCell>{ele.ba_name}</TableCell>
                                <TableCell>{ele.name}</TableCell>
                                <TableCell>{ele.scope_manager}</TableCell>
                                <TableCell>{ele.standard}</TableCell>
                                <TableCell>
                                    <a className='bg-green-600  inline-block px-2 py-2 rounded-md text-white' target='_blank' href={ele?.s3PdfUrl}> <ArrowDownToLine size={16} /></a>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">No Certificate is generate yet.</TableCell>
                            </TableRow>
                        )
                }
            </TableBody>
        </Table>
    )
}
export default FinalCertificatePage