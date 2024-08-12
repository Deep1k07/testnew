"use client"

import { createClients, getAllBa, getBAByName } from '@/utils/apis'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
function CreateClientForm() {
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm()
    const [loading, setLoading] = useState(false);
    const [moreLanguage, setMoreLanguage] = useState(false)
    const [baList, setBaList] = useState([])
    const [responseData, setResponseData] = useState<any>({});
    const [cbData, setCbData] = useState<any>([]);
    const [abData, setAbData] = useState<any>([]);
    const[abName,setAbName]=useState<any>({})
    const [standardRate,setStandardRate] = useState<any>({});

    console.log("baList===", baList)
    const session = useSession()
    useEffect(() => {
        const getAllBas = async () => {
            if(session?.data?.user){
                const res = await getAllBa(session?.data?.user?._id)
                console.log("res====", res)
                setBaList(res)
            }
        }
        getAllBas()
    }, [session?.data])

    let language = [{ name: "English" }, { name: "Spanish" }, { name: "Bi Lingual" }, { name: "Arabic" }, { name: "Hindi" }]

    const handleClient = async (formdata: any) => {
        try {
            debugger;
            setLoading(true)
            let data: any = await createClients({...formdata, ba_manager: session?.data?.user?.username})
            console.log(data, "data")
            if (data?.success) {
                toast.success(data?.msg || " created successfully");             
            } else {
                toast.error(data?.msg || "Failed to create client")
                reset()
                setLoading(false)
            }
            debugger;
        } catch (error) {
            console.log(error)
        }finally{
            reset()
            setLoading(false)
            setCbData([])
            setAbData([])
            setAbName({})
            setMoreLanguage(false)
        }
    }
    const addMoreLanguage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setMoreLanguage(true)
    }

    const getBaName = async () => {
        let name = getValues('ba_name')
        if(name){
            try {
                const res = await getBAByName(name);
                setResponseData(res)
                setCbData(res?.cb);
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    // get abList by cb
    const getCBName= async () => {
        let name = getValues('cb_name')
        if(name){
            const cbDataList = cbData?.find((cb:any) => name === cb?.name)
            setAbData(cbDataList?.ab);
        }
    }

    // get ab data by abName
    const getAbName=()=>{
        let name = getValues('ab_name');
        if(name){
            const abDataList = abData?.find((ab:any) => name === ab?.name)
            setAbName(abDataList)
        }
    }

    const selectStandard = ()=>{
        let standardCode = getValues('standard')
        console.log("standardCode===",standardCode)
        if(standardCode){
            let standard = abName?.standards?.find((st:any)=> standardCode === st.code)
            console.log("standard===",standard)
            setStandardRate(standard)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleClient)} className=' py-4 px-3'>


            <div className='flex sm:flex-row flex-col gap-y-2 sm:gap-y-0 gap-x-4'>
                <div className="w-full">
                    <label className='text-gray-500'>Name Of the Organization</label>
                    <Input className="mt-2" {...register('name', { required: 'Name is required' })} />
                    {errors.name && <p className="text-red-500">{errors?.name?.message as string}</p>}
                </div>

                <div className="w-full">
                    <label className='text-gray-500'>Address Of the Organization</label>
                    <Input className="mt-2"  {...register('address', { required: 'Address is required' })} />
                    {errors.address && <p className="text-red-500">{errors?.address?.message as string}</p>}
                </div>

            </div>
            <div className='grid sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-4 mt-2  sm:mt-4'>
                <div className="w-full">
                    <label className='text-gray-500'>BA Name</label>
                    <select
                        className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                        {...register("ba_name", { required: "BA Name is required" })}
                        onClick={getBaName}
                    >
                        <option className='text-gray-500' value="">Select BA</option>
                        {baList?.map((item: any, index) => (
                            <option className='text-gray-500' key={index} value={item.name}>{item.name}</option>
                        ))}

                    </select>
                    {errors.ba_name && <p className="text-red-500">{errors?.ba_name?.message as string}</p>}

                </div>
                {
                    cbData && cbData?.length > 0 && (
                        <>
                            <div className="w-full">
                                <label className='text-gray-500'>CB Name</label>
                                <select
                                    id="standard"
                                    className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                                    {...register("cb_name", { required: "CB Name is required" })} onClick={getCBName}
                                >
                                    <option className='text-gray-500' value="">Select CB</option>
                                    {cbData?.map((item: any, index: any) => (
                                        <option className='text-gray-500' key={index} value={item.name}>{item.name}</option>
                                    ))}

                                </select>
                                {errors.cb_name && <p className="text-red-500">{errors?.cb_name?.message as string}</p>}
                            </div>
                        
                        </>
                    )
                }
                {
                    abData && abData?.length > 0 && <div className="w-full">
                        <label className='text-gray-500'>AB Name</label>
                        <select
                            id="ab_name"
                            className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                            {...register("ab_name", { required: "AB Name is required" })}
                         onClick={getAbName} >
                            <option className='text-gray-500' value="">Select AB</option>
                            {abData?.map((item: any, index:any) => (
                                <option className='text-gray-500' key={index} value={item.name}>{item.name}</option>
                            ))}

                        </select>
                        {errors.ab_name && <p className="text-red-500">{errors?.ab_name?.message as string}</p>}
                    </div>
                }

                {
                    abName?.name && <>  <div className="w-full">
                        <label className='text-gray-500'>Standard</label>
                        <div className="mt-2">
                            <select
                                id="standard"
                                className="py-2 border w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                                {...register("standard", { required: "Standard is required" })}
                                onClick={selectStandard}
                            >
                                <option className='text-gray-500' value="">Select Standard</option>
                                {abName?.standards && abName?.standards?.map((item: any, index: any) => (
                                    <option className='text-gray-500' key={index} value={item.code}>{item.code}</option>
                                ))}
                            </select>
                            {errors.standard && <p className="text-red-500">{errors?.standard?.message as string}</p>}
                        </div>
                    </div>
                        <div className="w-full">
                            <label className='text-gray-500'>Country</label>
                            <select
                                id="standard"
                                className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                                {...register("country", { required: "CB Name is required" })}
                            >
                                <option className='text-gray-500' value="">Country</option>
                                {abName?.countries &&  abName?.countries?.map((item: any, index: any) => (
                                    <option className='text-gray-500' key={index} value={item.code}>{item.name}</option>
                                ))}
                            </select>
                            {errors.country && <p className="text-red-500">{errors?.country?.message as string}</p>}
                        </div>
                    </>
                }

                {
                    standardRate?.rateCard &&
                    <div className="w-full">
                        <label className='text-gray-500'>Select Rate</label>
                        <select
                            id="standard"
                            className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                            {...register("rate", { required: "Rate is required" })}
                        >
                            <option className='text-gray-500' value="">Select Rate</option>
                            {standardRate?.rateCard && Object.keys(standardRate.rateCard)?.map((key) => (
                                <option className='text-gray-500' key={key} value={standardRate.rateCard[key]}>
                                {key}: {standardRate.rateCard[key]}
                                </option>
                            ))}

                        </select>
                        {errors.rate && <p className="text-red-500">{errors?.rate?.message as string}</p>}
                    </div>
                }
                <div className="w-full">
                    <label className='text-gray-500'>Drive Link</label>
                    <Input className="mt-2" {...register('drive_link', { required: 'Drive Link is required' })} />
                    {errors.drive_link && <p className="text-red-500">{errors?.drive_link?.message as string}</p>}
                </div>
                <div className="w-full">
                    <label className='text-gray-500'>Number of Employee</label>
                    <Input className="mt-2" {...register('employee_count', { required: 'Employee is required' })} />
                    {errors.employee_count && <p className="text-red-500">{errors?.employee_count?.message as string}</p>}
                </div>

            </div>
            <div className="w-full mt-2 sm:mt-4">
                <label className='text-gray-500'>Mail ID</label>
                <Input className="mt-2" {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className="text-red-500">{errors?.email?.message as string}</p>}
            </div>
            <div className="w-full mt-2 sm:mt-4">
                <label className='text-gray-500'>Scope</label>
                <Textarea className="mt-2" {...register('scope', { required: 'Scope is required' })} />
                {errors.scope && <p className="text-red-500">{errors?.scope?.message as string}</p>}
            </div>
            <div className='grid sm:grid-cols-2 gap-y-2 sm:gap-y-0 gap-x-4 mt-2 sm:mt-4'>
                <div className="w-full">
                    <label className='text-gray-500'>Language of Certificate</label>
                    <select

                        className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                        {...register("certificate_language", { required: "Language of Certificate is required" })}
                    >
                        <option className='text-gray-500' value="">Select Language</option>
                        {language?.map((item, index) => (
                            <option className='text-gray-500' key={index} value={item.name}>{item.name}</option>
                        ))}

                    </select>
                    {errors.certificate_language && <p className="text-red-500">{errors?.certificate_language?.message as string}</p>}

                </div>
                {
                    moreLanguage && <div className="w-full">
                        <label className='text-gray-500'>Other Certificate Language</label>
                        <select

                        className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                        {...register("other_certificate_language", { required: "Language of Certificate is required" })}
                    >
                        <option className='text-gray-500' value="">Select Language</option>
                        {language?.map((item, index) => (
                            <option className='text-gray-500' key={index} value={item.name}>{item.name}</option>
                        ))}

                    </select>
                        {errors.other_certificate_language && <p className="text-red-500">{errors?.other_certificate_language?.message as string}</p>}
                    </div>
                }
            </div>
            <div className="flex justify-between mt-4 pr-2">
                <Button onClick={(e) => addMoreLanguage(e)}>
                    Add One More Language
                </Button>
                <Button>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </form>
    )
}

export default CreateClientForm