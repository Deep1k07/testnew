
"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import EditModal from './EditModal'
import CountryEditModal from './CountryEditModal'
import DeleteStandardModal from './DeleteStandardModal'
import DeleteCountryModal from './DeleteCountryModal'
import AddFormModal from './AddFormModal'
import AddABModal from './AddABModal'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

function InputForm({ cbName }: any) {
    const [check, setCheck] = useState(null)
    const [visible, setVisible] = useState(false)
    const [countryVisible, setCountryVisible] = useState(false)
    const [deleteStandard, setDeleteStandard] = useState(false)
    const [deleteCountry, setDeleteCountry] = useState(false)
    const [data, setData] = useState({})
    const [countryData, setCountryData] = useState({})
    const [deleteStandardData, setDeleteStandardData] = useState({})
    const [deleteCountryData, setDeleteCountryData] = useState({})
    const [title, setTitle] = useState("")
    const [addAB, setAddAB] = useState(false)
    const [standardData, setStandardData] = useState({}) // standard modal
    const [countryPayload, setcountryPayload] = useState({}) // country modal
    const [addForm, setAddForm] = useState(false)
    // State to store the selected value
    const [selectedAbRole, setSelectedAbRole] = useState('');


    const {data: cbData , mutate} = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/admin/cb/${cbName}`,fetcher)

    let cb = cbData?.data

    // Handler to update the state when a new option is selected
    const handleChange = (event: any) => {
        setSelectedAbRole(event.target.value);
    };

    // Apply all logic here  
    const ABSelectedArray = cb?.ab?.filter((ele: any) => ele.name === selectedAbRole);
     
    const { register, handleSubmit, formState: { errors } } = useForm()

    // State to track the index of the item being edited
    const [editingIndex, setEditingIndex] = useState(null);
    // State to track the current input value
    const [currentValue, setCurrentValue] = useState('');

    const handleEditClick = (index: any, value: any) => {
        setEditingIndex(index);
        setCurrentValue(value);
    };



    const handleSaveClick = () => {
        // Handle saving the edited value here
        console.log('Save', currentValue);
        // Reset editing state after saving
        setEditingIndex(null);
    };

    const handleInputChange = (event: any) => {
        setCurrentValue(event.target.value);
    };

    const editModal = (ele: any) => {
        setVisible(true);
        setData(ele)
    }
    const countryEditModal = (ele: any) => {
        setCountryVisible(true);
        setCountryData(ele)
    }

    const standardDeleteModal = (ele: any) => {
        setDeleteStandard(true);
        setDeleteStandardData(ele)

    }
    const countryDeleteModal = (ele: any) => {
        setDeleteCountryData(ele)
        setDeleteCountry(true)
    }

    const addStandardHandler = (value: any) => {
        setTitle(value);
        setAddForm(true);
    }
    const addCountrydHandler = (value: any) => {
        setTitle(value);
        setAddForm(true)
    }

    return (
        <>
            <div className='bg-white px-3 shadow-md rounded-lg py-4'>
                <h3 className='text-xl font-semibold text-black '>{cbName}</h3>
                <Tabs defaultValue="ab" className="w-full mt-4">
                    <TabsList className="flex gap-x-6 justify-start">
                        <TabsTrigger value="ab" className='md:min-w-[100px] lg:min-w-[150px]'>AB</TabsTrigger>
                        <TabsTrigger value="standard" className='md:min-w-[100px] lg:min-w-[150px]'>Standard</TabsTrigger>
                        <TabsTrigger value="country" className='md:min-w-[100px] lg:min-w-[150px]'>Country</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ab">
                        <div className='ab-checks  mt-4'>
                            <div className='flex justify-between mt-4'>
                                <h3 className='text-xl font-semibold text-black'>Accrebitstion Body</h3>
                                {/* <Button onClick={() => setAddAB(true)}>Add</Button> */}
                            </div>
                            <select
                                className="py-2 border mt-4 border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none w-full max-w-[500px]"
                                value={selectedAbRole} // Bind the state to the select element
                                onChange={handleChange} // Handle changes
                            >
                                <option className="text-gray-500" value="">
                                    Select Role
                                </option>
                                {cb?.ab?.map((ele: any, index: any) => (
                                    <option className="text-gray-500" key={index} value={ele?.name}>
                                        {ele?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {
                            addAB && <AddABModal addAB={addAB} setAddAB={setAddAB} />
                        }
                    </TabsContent>
                    <TabsContent value="standard">
                        <div className='w-full mt-4'>
                            <div className='w-full flex justify-between mt-4'>
                                <h3 className='text-xl font-semibold text-black'>Standard</h3>
                                <Button className='mr-5' onClick={() => addStandardHandler("Standard")}>Add</Button>
                            </div>
                            <Table className='mt-4'>

                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] w-[150px] ">S.No</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Name</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Code</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[170px] w-[170px]">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    { ABSelectedArray?.length>0 &&  ABSelectedArray[0]?.standards?.map((ele: any, index: any) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{ele.name}</TableCell>
                                            <TableCell>{ele.code}</TableCell>
                                            <TableCell>
                                                <div className='flex gap-x-4'>
                                                    <Button onClick={() => editModal(ele)}><Pencil size={16} /></Button>
                                                    <Button onClick={() => standardDeleteModal(ele)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                            {
                                visible &&
                                <EditModal setVisible={setVisible} data={data} visible={visible} cbName={cb?.cb} abName={selectedAbRole} mutate={mutate}/>
                            }
                            {
                                deleteStandard && <DeleteStandardModal deleteStandard={deleteStandard} setDeleteStandard={setDeleteStandard} data={deleteStandardData} cbName={cb?.cb} abName={selectedAbRole} mutate={mutate} />
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="country">
                        <div className='w-full mt-4'>
                            <div className='w-full flex justify-between mt-4'>
                                <h3 className='text-xl font-semibold text-black'>Country</h3>
                                <Button className='mr-5' onClick={() => addCountrydHandler("Country")}>Add</Button>
                            </div>
                            <Table className='mt-4' >
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] w-[150px] ">S.No</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px]">Country Name</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Code</TableHead>
                                        <TableHead className="font-semibold whitespace-nowrap min-w-[170px] w-[170px]">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ABSelectedArray?.length>0 && ABSelectedArray[0]?.countrys?.map((ele: any, index: any) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{ele?.name}</TableCell>
                                            <TableCell>{ele?.code}</TableCell>
                                            <TableCell>
                                                <div className='flex gap-x-4'>
                                                    <Button onClick={() => countryEditModal(ele)}><Pencil size={16} /></Button>
                                                    <Button onClick={() => countryDeleteModal(ele)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                            {countryVisible && <CountryEditModal setVisible={setCountryVisible} data={countryData} visible={countryVisible} cbName={cb?.cb} abName={selectedAbRole} mutate={mutate}/>}
                            {
                                deleteCountry && <DeleteCountryModal deleteCountry={deleteCountry} setDeleteCountry={setDeleteCountry} data={deleteCountryData} cbName={cb?.cb} abName={selectedAbRole} mutate={mutate}/>
                            }
                        </div>
                    </TabsContent>
                </Tabs>
                {addForm && <AddFormModal addForm={addForm} setAddForm={setAddForm} title={title} cbName={cb?.cb} abName={selectedAbRole} />}
            </div>
        </>
    )
}

export default InputForm