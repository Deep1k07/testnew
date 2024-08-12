'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

function RateInput(data:any) {
//   console.log("==============Data",data)
//  const[standard,setStandard]=useState([]);
//  useEffect(()=>{
//   setStandard(data.standard);
//  },[data])


  return (
    <>
  
        <div  className="w-full flex flex-col gap-y-2 mt-4">
        <div className="w-full flex gap-x-4 px-3">
          <div className="flex flex-col w-full">
            <Input
              type="text"
              placeholder="Standard"
            
              name="standard"
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="text"
              placeholder="Initial"
              name="initial"
            />
  
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="text"
              placeholder="Annual"
              name="annual"
            />
  
          </div>
          <div className="flex flex-col w-full">
            <Input
              type="text"
              placeholder="Recirtification"
              name="recirtification"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RateInput;
