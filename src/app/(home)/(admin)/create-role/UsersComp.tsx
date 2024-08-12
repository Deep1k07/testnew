"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';
import useSWR from 'swr'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { createNewUser } from "@/utils/apis";
import DeleteClientModal from "./DeleteClientModal";
import { fetcher } from "@/utils/fetcher";
import SkeletionTable from "@/components/custom/Skelton/Skelton";

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

interface Role {
  _id: string;
  username: string;
  role: string;
  email: string;
  phone: string;
}
interface RolesResponse {
  data: Role[];
}

const UserComp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  // api call =====
  const { data: roles, mutate, isLoading } = useSWR<RolesResponse>(`${process.env.NEXT_PUBLIC_API_URI}/admin/role`, fetcher)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteClient, setDeleteClient] = useState(false);
  const [idData, setIdData] = useState(null);
  const handleUser = async (field: any) => {
    const payload = {
      username: field?.username,
      email: field?.email,
      phone: field?.phone,
      role: field?.role,
      password: field?.password,
    }
    try {
      setLoading(true)
      const res = await createNewUser(payload)
      if (res?.success) {
        toast.success(res?.msg || "User created Successfully", {
          id: "success-user",
        });
        mutate()
      } else {
        toast.error(res?.msg || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset()
      setLoading(false)
    }


  }
  const deleteHandler = (e: any) => {
    setDeleteClient(true);
    setIdData(e)
  }

  // "Admin","BA Manager","Scope Manager","Quality Manager","Certificate Manager"
  const role = [
    { label: "Admin", value: "Admin" },
    { label: "BA Manager", value: "BA_Manager" },
    { label: "Scope Manager", value: "Scope_Manager" },
    { label: "Quality Manager", value: "Quality_Manager" },
    { label: "Certificate Manager", value: "Certificate_Manager" },
  ]
  return (
    <Dialog>
      <div className="bg-white shadow-md rounded-lg pb-4 ">
        <div className='flex justify-between items-center border-b-2  border-gray-500 px-3'>
          <h3 className='text-base font-semibold pt-4 pb-4 text-black'>Create Role</h3>
          <DialogTrigger className="bg-red-600 text-white rounded-md px-3 py-2 hover:bg-red-600/90">
            Create User
          </DialogTrigger>
        </div>
        {
          isLoading ? <SkeletionTable count={8} /> :
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[100px] w-[50px] ">S.No</TableHead>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">User Name</TableHead>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">User Role</TableHead>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Email Address</TableHead>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Phone</TableHead>
                  <TableHead className="font-semibold whitespace-nowrap min-w-[150px] w-[150px] ">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  roles && roles?.data?.map((items: any, idx: number) => (

                    <TableRow key={idx} >
                      <TableCell className="text-nowrap ">{idx + 1}</TableCell>
                      <TableCell className="text-nowrap ">{items?.username || ""}</TableCell>
                      <TableCell className="text-nowrap ">{items?.role || ""}</TableCell>
                      <TableCell className="text-nowrap ">{items?.email || ""}</TableCell>
                      <TableCell className="text-nowrap ">{items?.phone || ""}</TableCell>
                      <TableCell className="cursor-pointer">
                        <div className="flex justify-between">
                          <Button onClick={() => { router.push(`create-role/${items?._id}`) }}>
                            <Pencil size={16} />
                          </Button>
                          <Button onClick={() => deleteHandler(items?._id)}>
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
        }

      </div>

      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            <form className="space-y-4 px-3 py-4" onSubmit={handleSubmit(handleUser)}>
              <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0   gap-x-4">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    UserName
                  </label>
                  <div className="mt-1">
                    <Input id="username" type="username" placeholder="Username" {...register('username', { required: 'Username is required' })} />
                  </div>
                  {
                    errors.username && (
                      <p className="text-sm text-red-600 mt-2">{errors.username.message as string}</p>
                    )
                  }
                </div>
                <div className="w-full">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Role
                  </label>
                  <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                    {...register('role', { required: 'Role is required' })}>
                    <option className='text-gray-500' value="1">Select Role</option>
                    {
                      role?.map((ele, index) => (
                        <option key={index} className='text-gray-500' value={ele.value}>{ele.label}</option>
                      ))
                    }


                  </select>
                  {
                    errors.role && (
                      <p className="text-sm text-red-600 mt-2">{errors.role.message as string}</p>
                    )
                  }
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0   gap-x-4">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="">
                    <Input id="email" type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} />
                  </div>
                  {
                    errors.email && (
                      <p className="text-sm text-red-600 mt-2">{errors.email.message as string}</p>
                    )
                  }
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="">
                    <Input id="phone" type="phone" placeholder="Phone" {...register('phone', { required: 'Phone is required' })} />
                  </div>
                  {
                    errors.phone && (
                      <p className="text-sm text-red-600 mt-2">{errors.phone.message as string}</p>
                    )
                  }
                </div>

              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="">
                  <Input id="password" type="password" placeholder="Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long'
                      },
                      pattern: {
                        value: passwordRegex,
                        message: 'Password must contain one uppercase, one lowercase, one digit, and one special character'
                      }
                    })}
                  />
                </div>
                {
                  errors.password && (
                    <p className="text-sm text-red-600 mt-2">{errors.password.message as string}</p>
                  )
                }
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                >
                  {loading ? "Creating..." : "Create Role"}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      {
        deleteClient && <DeleteClientModal deleteClient={deleteClient} setDeleteClient={setDeleteClient} idData={idData} mutate={mutate} />
      }

    </Dialog>


  );
};

export default UserComp;
