import React from 'react'
import RateInput from "./RateInput"
function ShowRate() {
    return (
        <div className='bg-white shadow-md rounded-md mt-4'>
            <div className='border-b-2  border-gray-500'>
                <h3 className='text-base text-black font-semibold pt-4 pb-4 px-3'>Rate Cart</h3>
            </div>
            <div className='py-4 px-3'>

                <div className='mt-4'>
                    <div className='w-full flex gap-x-4'>
                        <div className='w-full flex gap-x-4'>
                            <div className='w-full bg-gray-100 text-gray-500 rounded-md  flex justify-center py-2 '>Rate Cart</div>
                            <div className='w-full bg-gray-100 text-gray-500 rounded-md  flex justify-center py-2 '>Initial</div>
                        </div>
                        <div className='w-full flex gap-x-4'>
                            <div className='w-full bg-gray-100 text-gray-500 rounded-md  flex justify-center py-2 '>Anual</div>
                            <div className='w-full bg-gray-100 text-gray-500  rounded-md flex justify-center py-2 '>Recirtification</div>
                        </div>
                    </div>
                </div>
                <RateInput />
            </div>
        </div>
    )
}

export default ShowRate