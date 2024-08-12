"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChildProps } from "@/types/types";
import { exit } from "process";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { toast } from 'sonner'


type Standard = {
  name: string;
  code: string;
};

type Country = {
  name: string;
  code: string;
};

type AB = {
  name: string;
  standards: Standard[];
  countrys: Country[];
};

type CB = {
  _id: string;
  cb: string;
  ab: AB[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RateCard = {
  initial?: string;
  annual?: string;
  recertification?: string;
};

type CbArrayItem = {
  name: string;
  ab: {
    name: string;
    standards: {
      name: string;
      code: string;
      rateCard: RateCard;
    }[];
  }[];
};

type BASchemaPayload = {
  name: string;
  email: string;
  country: string;
  currency: string;
  gst: string;
  certificate_language: string;
  other_certificate_language: string;
  cb: CbArrayItem[];
  ba_manager: string;
};

interface YourComponentProps {
  data: { CbList: CB[] };
}

const CreateBAForm = ({ data, cbArray, setCbArray }: any) => {
  const [selectedCb, setSelectedCb] = useState<CB | null>(null);
  const [selectedAb, setSelectedAb] = useState<AB[]>([]);
  const [abOptions, setAbOptions] = useState<{ label: string, value: string }[]>([]) // ab options array for multiselect AB component
  const [abValue, setAbValue] = useState<{ label: string, value: string }[]>([]) // ab value array for multiselect AB component
  const [stdOptions, setStdOptions] = useState<{ label: string, value: string }[]>([]) // standards options array for multiselect AB component
  const [stdValue, setStdValue] = useState<{ label: string, value: string }[]>([]) // standards value array for multiselect AB component
  const [selectedStandards, setSelectedStandards] = useState<Standard[]>([]);
  const [rateCards, setRateCards] = useState<Record<string, RateCard>>({});
  const [allRateCards, setAllRateCards] = useState<string[]>([]);


  console.log("cbArray>>>>", cbArray)

  const handleCbSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCbId = e.target.value;
    const cb = data.find((cb: any) => cb._id === selectedCbId) || null;
    setSelectedCb(cb);
    setAbOptions(prev => {
      const data = cb.ab.map((ele: any) => ({ label: ele?.name, value: ele?.name }))
      return data
    })
    setAbValue([])
    setSelectedAb([]);
    setSelectedStandards([]);
    setRateCards({});
  };

  const handleAbSelect = (e: any) => {
    setStdOptions(prev => []);
    setSelectedAb(prev => []);
    setAbValue(e)
    e.map((ele: any) => {
      const selectedAbName = ele.label;
      const ab: AB = selectedCb?.ab.find((ab) => ab.name === selectedAbName) as AB;
      const options: any = ab?.standards?.map(val => ({ label: val.code, value: val?.code }))
      setStdValue([]);
      setStdOptions(prev => [...prev, ...options])
      setSelectedAb(prev => [...prev, ab]);
      setSelectedStandards([]);
      setRateCards({});
    })
  };

  const handleStandardSelect = (e: any) => {
    setStdValue(e)
    if (e?.length === 0) {
      setSelectedStandards([])
    }
    let standards: Standard[] = [];
    const standardsName = e.map((ele: any) => {
      const selectedCode = ele.label;
      standards = [...standards, ...selectedAb?.map((val: any) => val?.standards.find((s: any) => s.code === selectedCode))]
      return ele?.label
    })
    setSelectedStandards([...standards]);
    setAllRateCards(standardsName)
  };

  const handleRateCardChange = (
    standard: Standard,
    type: keyof RateCard,
    value: string
  ) => {
    setRateCards((prev) => ({
      ...prev,
      [standard.code]: {
        ...prev[standard.code],
        [type]: value,
      },
    }));
  };

  const handleAddCb = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if(!selectedCb?.cb){
      return toast('Please select a CB')
    }
    if(selectedAb?.length==0){
      return toast('Please select AB\'s')
    }
    if(selectedStandards?.length==0){
      return toast('Please select standards')
    }
    let flag = false;
    allRateCards?.forEach((ele: string) => {
      const rates = rateCards?.[ele];
      if (!rates?.initial || !rates?.annual || !rates?.recertification) {
        flag = true;
      }
    })
    if (flag) {
      return toast('All data fields are mandatory in CB Part of the form.')
    }
    if (selectedCb && selectedAb?.length!==0 && selectedStandards?.length!==0) {
      const newCbEntry: CbArrayItem = {
        name: selectedCb.cb,
        ab: selectedAb?.map((e: any) => {
          return {
            name: e?.name,
            standards: selectedStandards.map((standard) => ({
              name: standard.name,
              code: standard.code,
              rateCard: rateCards[standard.code] || {},
            })),
          }
        })


        // [
        //   {
        //     name: selectedAb.name,
        //     standards: selectedStandards.map((standard) => ({
        //       name: standard.name,
        //       code: standard.code,
        //       rateCards: rateCards[standard.code] || {},
        //     })),
        //   },
        // ],
      };

      setCbArray((prev:CbArrayItem[]) => [...prev, newCbEntry]);
      setSelectedCb(null);
      setSelectedAb([]);
      setSelectedStandards([]);
      setRateCards({});
    }
  };

  const handleSubmit = () => {
    const payload: BASchemaPayload = {
      name: "Your BA Name", // Replace with actual form data
      email: "email@example.com", // Replace with actual form data
      country: "Country Name", // Replace with actual form data
      currency: "Currency", // Replace with actual form data
      gst: "GST Value", // Replace with actual form data
      certificate_language: "Certificate Language", // Replace with actual form data
      other_certificate_language: "Other Certificate Language", // Replace with actual form data
      cb: cbArray,
      ba_manager: "Manager ID", // Replace with actual manager ID
    };

    console.log(payload);
  };


  return (
    <div className="shadow-md rounded-md bg-white px-3 py-3 border-2 border-gray-200">
      <h2>Select Certification Body (CB)</h2>
      <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none" onChange={handleCbSelect} value={selectedCb?._id || ""}>
        <option value="" disabled>
          Select CB
        </option>
        {data?.map((cb: any) => {
          let disabled: boolean = false;
          cbArray?.forEach((e:CbArrayItem) => { if (e?.name == cb.cb) { disabled = true } });
          return <option key={cb._id} value={cb._id} disabled={disabled} className={`${disabled ? "text-gray-300" : ''}`}>
            {cb.cb}
          </option>
        })}
      </select>

      {selectedCb && (
        <>
          <h3>Select Accreditation Body (AB)</h3>
          <MultiSelect
            options={abOptions}
            value={abValue}
            onChange={handleAbSelect}
            labelledBy="Select AB"
          />

          {/* <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none" onChange={handleAbSelect} value={selectedAb?.name || ""}>
            <option value="" disabled>
              Select AB
            </option>
            {selectedCb.ab.map((ab) => {
              console.log(ab)
              return <option key={ab.name} value={ab.name}>
                {ab.name}
              </option>
            })}
          </select> */}
        </>
      )}

      {selectedAb?.length !== 0 && (
        <>
          <h4>Select Standards</h4>
          <MultiSelect
            options={stdOptions}
            value={stdValue}
            onChange={handleStandardSelect}
            labelledBy="Select Standaards"
          />
          {/* <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none" onChange={handleStandardSelect} value="">
            <option value="" disabled>
              Select Standard
            </option>
            {selectedAb.standards.map((standard) => (
              <option key={standard.code} value={standard.code}>
                {standard.code}
              </option>
            ))}
          </select> */}
          {console.log(selectedStandards, 'SELECTED STANDARDS')}
          {selectedStandards.length > 0 && (
            <div >
              <h5>Rate Cards</h5>
              {selectedStandards.map((standard) => (
                <div className="flex w-full justify-between gap-x-4" key={standard.code}>
                  <label className="w-full">
                    Standards Code:
                    <Input
                      type="number"
                      value={standard.code}
                      disabled
                    />
                  </label>
                  <label className="w-full">
                    Initial:
                    <Input
                      type="number"
                      onChange={(e) =>
                        handleRateCardChange(
                          standard,
                          "initial",
                          e.target.value
                        )
                      }
                    />
                  </label>
                  <label className="w-full">
                    Annual:
                    <Input
                      type="number"
                      onChange={(e) =>
                        handleRateCardChange(
                          standard,
                          "annual",
                          e.target.value
                        )
                      }
                    />
                  </label>
                  <label className="w-full">
                    Recertification:
                    <Input
                      type="text"
                      onChange={(e) =>
                        handleRateCardChange(
                          standard,
                          "recertification",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="mt-4 flex justify-end">
        <span onClick={(e)=>handleAddCb(e)} className="h-10 w-16  rounded-md text-[12px] flex justify-center items-center  text-white bg-red-600 cursor-pointer">Add CB</span>
      </div>
    </div>
  );
};

export default CreateBAForm;
