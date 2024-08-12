"use client"
import SkeletionTable from '@/components/custom/Skelton/Skelton';
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBAByName } from '@/utils/apis';
import React, { useEffect, useState } from 'react'
function RateCart({ name }: any) {
    const [cbData, setCbData] = useState([]);
    const [abData, setAbData] = useState<any>([])
    useEffect(() => {
        const getRateCart = async () => {
            const res = await getBAByName(name);
            setCbData(res?.cb)
        }
        getRateCart();
    }, [name])
    useEffect(() => {
        if (cbData.length > 0) {
            const newAbData = cbData.flatMap((ele: any) => ele.ab);
            setAbData(newAbData);
        }
    }, [cbData]);

    return (
        <>
            {
                abData.length == 0 || cbData.length == 0 ? <SkeletionTable count={7} /> : <div className='bg-white shadow-md rounded-md px-3 py-4'>
                    <div className='p-2 border shadow-sm border-gray-200 rounded-md font-semibold  flex items-center gap-x-2'>
                        {
                            cbData?.map((ele: any, index: any) => (
                                <p key={index} className=''>{ele.name}</p>
                            ))
                        }
                        <p>-</p>
                        {
                            abData?.map((ele: any, index: any) => (
                                <p key={index} className=''>{ele.name}</p>
                            ))
                        }
                    </div>
                    {
                        abData?.map((ele: any) => (
                            ele.standards?.map((value: any, index: any) => (
                                <div key={index} className="w-full flex gap-x-4 mt-3">
                                    <div className="flex flex-col w-full">
                                        <Input
                                            type="text"
                                            placeholder="Standard"
                                            name="standard"
                                            value={value.code} // Uncomment this line if you want to show the value
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <Input
                                            type="text"
                                            placeholder="Initial"
                                            name="initial"
                                            value={value.rateCard.initial} // Uncomment this line if you want to show the value
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <Input
                                            type="text"
                                            placeholder="Annual"
                                            name="annual"
                                            value={value.rateCard.annual} // Uncomment this line if you want to show the value
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <Input
                                            type="text"
                                            placeholder="Recertification"
                                            name="recertification"
                                            value={value.rateCard.recertification} // Uncomment this line if you want to show the value
                                            disabled
                                        />
                                    </div>
                                </div>
                            ))
                        ))
                    }
                </div>
            }

        </>
    )
}

export default RateCart