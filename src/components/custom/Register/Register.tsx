"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter();

  const registerUser = async (field: any) => {
    try {
      let res = await axios.post(`/api/register`, {
        username: field?.username,
        email: field?.email,
        phone: field?.phone,
        role: field?.role,
        password: field?.password,
      });

      let { data } = res;
      if (data?.success) {
        toast.success("Registered successfully", {
          id: "register-success",
        });
        router.push("/login");
      } else {
        toast.error(data?.msg || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }


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
        <div className='flex justify-between items-center border-b-2  border-gray-500'>
          <h3 className='text-base text-black font-semibold pt-4 pb-4 px-3'>Create Role</h3>
          <DialogTrigger>
            <Button>Create User</Button>
          </DialogTrigger>
        </div>

        <Table >
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">User Name</TableHead>
              <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">User Role</TableHead>
              <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Email Address</TableHead>
              <TableHead className="font-semibold whitespace-nowrap min-w-[150px] ">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
            <TableRow  >
              <TableCell>Deepak Chaurasiya</TableCell>
              <TableCell>BA Manager</TableCell>
              <TableCell>deepakchaurasiya123@gmail.com</TableCell>
              <TableCell>8856754952</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crate User</DialogTitle>
          <DialogDescription>
            <form className="space-y-4 px-3 py-4" onSubmit={handleSubmit(registerUser)}>
              <div className="flex gap-x-4">
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    UserName
                  </label>
                  <div className="mt-2">
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
                  <select className="py-2 border mt-2 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
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

              <div className="flex gap-x-4">
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
                  <Input id="password" type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
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
                  className="flex mt-4 justify-center rounded-md bg-[#33666D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#33666D]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Create Role
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>


  );
};

export default RegisterForm;
