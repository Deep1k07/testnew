"use client";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { MultiSelect, Option } from "react-multi-select-component";
import { createBA, GetAllCBList, getCbByName } from "@/utils/apis";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateRate from "@/components/custom/RateCart/CreateRate";
import { BaData, StateType, CBListItem, FormData, CbList } from "@/types/types";
import CreateBAForm from "@/components/custom/RateCart/CreateRate";
import { toast } from 'sonner'
import { useSession } from "next-auth/react";




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

type RateCard = {
  initial?: string;
  annual?: string;
  recertification?: string;
};



function Hello() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [cbLoading, setCbLoading] = useState(true);
  const [selectedStandards, setSelectedStandards] = useState<{ [key: string]: Option[] }>({});
  const [cbList, setCbList] = useState<CBListItem[]>([]);
  // const [selectedCB, setSelectedCB] = useState<Option[]>([]);
  const [cbOptions, setCbOptions] = useState<CbList[]>([]);
  const [cbArray, setCbArray] = useState<CbArrayItem[]>([]);

  const session = useSession()
 

  const currencies: Option[] = [
    { label: "USD", value: "USD" },
    { label: "INR", value: "INR" },
  ];

  const gsts: Option[] = [
    { label: "Applicable", value: "Applicable" },
    { label: "Not Applicable", value: "Not Applicable" },
  ];

  const languages: Option[] = [
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Hindi", value: "Hindi" },
  ];

  // CB Data from DB
  const getAllCbList = async () => {
    setCbLoading(true)
    try {
      const res = await GetAllCBList();
      setCbList(res);
      setCbOptions(res);
    } catch (error) {
      console.log(error);
    } finally {
      setCbLoading(false)
    }
  };

  const handleBA = async (formData: FormData) => {
    console.log(formData, 'from handle BA')
    // Map selected items to standards array with rate information
    // const rates = Object.entries(selectedStandards).map(([cbName, items], index) => ({
    //   standard: items.map((item) => item.value),
    //   initial: formData[`initial_${index}`] || "",
    //   annual: formData[`annual_${index}`] || "",
    //   recertification: formData[`recertification_${index}`] || "",
    // }));

    // Create the payload with formData and rates
    if (cbArray?.length === 0) {
      return toast('Add CB data to create BA.')
    }
    const payload = {
      ...formData,
      cb:cbArray,
      ba_manager: session?.data?.user?._id
    };

    try {
      setLoading(true);
      const res = await createBA(payload);
      if (res?.success) {
        // Handle success (e.g., show a notification)
      } else {
        // Handle error (e.g., show a notification)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      reset();
      setCbArray([])
    }
  };

  useEffect(() => {
    getAllCbList();
  }, []);


  const handleGstChange = (e: any) => {
    let value = e.target.value
    console.log("value+++>>>", value)
    setValue("gst", value)
  }

  return (
    <form
      onSubmit={handleSubmit(handleBA)}
      className="bg-white shadow-md rounded-md py-4 px-6"
    >
      <div className="pb-4 px-3">
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0  gap-x-4 mt-5">
          <div className="w-full">
            <label className="text-gray-500">Name Of BA</label>
            <Input
              className="mt-2"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors?.name?.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="text-gray-500">Home Country</label>
            <Input
              className="mt-2"
              {...register("country", {
                required: "Country is required",
              })}
            />
            {errors?.country && (
              <p className="text-red-500">{errors?.country?.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 mt-2  gap-x-4 sm:mt-5">
          <div className="w-full">
            <label className="text-gray-500">Currency</label>
            <select
              className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
              {...register("currency", { required: "Currency is required" })}
            >
              <option className="text-gray-500" value="">
                Select Currency
              </option>
              {currencies.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors?.currency && (
              <p className="text-red-500">{errors?.currency?.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="text-gray-500">GST</label>
            <select
              className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
              {...register("gst", { required: "GST is required" })}
            >
              <option className="text-gray-500" value="">
                Select GST
              </option>
              {gsts.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors?.gst && (
              <p className="text-red-500">{errors?.gst?.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 mt-2  gap-x-4 sm:mt-5">
          <div className="w-full">
            <label className="text-gray-500">Certificate Language</label>
            <select
              id="certificate_language"
              className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
              {...register("certificate_language", {
                required: "Certificate language is required",
              })}
            >
              <option className="text-gray-500" value="">
                Choose Language
              </option>
              {languages.map((item) => (
                <option key={item.label} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.certificate_language && (
              <p className="text-red-500">
                {errors?.certificate_language?.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="text-gray-500">Other Certificate Languages</label>
            <Input
              className="mt-2"
              {...register("other_certificate_language", {
                required: "Other Certificate language is required",
              })}
            />
            {errors.other_certificate_language && (
              <p className="text-red-500">
                {errors?.other_certificate_language?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-2 sm:mt-4">
          <label className="text-gray-500">Email ID</label>
          <Input
            className="mt-2"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors?.email?.message}</p>
          )}
        </div>
      </div>
      <CreateBAForm
        data={cbList}
        cbArray={cbArray}
        setCbArray={setCbArray}
      />
      <div className="flex justify-end mt-4 pr-2">
        <Button type="submit" >{loading ? "Loading..." : "Submit"}</Button>
      </div>
    </form>
  );
}

export default Hello;
