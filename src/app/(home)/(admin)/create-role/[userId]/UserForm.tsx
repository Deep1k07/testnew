'use client'
import { updateRoleById } from '@/utils/apis'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const UserForm = ({id ,user}: any) => {
    const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm()
    const [loading,setLoading] = useState(false)
    
    useEffect(()=>{
        if(user){
            setValue('username', user.username);
            setValue('email', user.email);
            setValue('phone', user.phone);
            setValue('role', user.role);
        }
    },[user, setValue])

    const role = [
        { label: "Admin", value: "Admin" },
        { label: "BA Manager", value: "BA_Manager" },
        { label: "Scope Manager", value: "Scope_Manager" },
        { label: "Quality Manager", value: "Quality_Manager" },
        { label: "Certificate Manager", value: "Certificate_Manager" },
      ]

    const editUserRole = async(data: any)=>{
        if(data?.password === data?.newPassword) return toast.error("Password is same as new password")

        debugger;
        try {
            setLoading(true)
            const res = await updateRoleById(id,data);
            if(!!res?.success){
                toast.success(res?.msg || "User updated successfully")
            }else{
                toast.error(res?.msg || "Failed to update user")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div>
        <form className="space-y-4 px-3 sm:py-4" onSubmit={handleSubmit(editUserRole)}>
              <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0   gap-x-4">
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
                      <p className="text-sm text-red-600 mt-1">{errors.username.message as string}</p>
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
                      <p className="text-sm text-red-600 mt-1">{errors.role.message as string}</p>
                    )
                  }
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-y-0   gap-x-4">
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input id="email" disabled={true} type="email" placeholder="Email" {...register('email', { required: 'Email is required' })} />
                  </div>
                  {
                    errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email.message as string}</p>
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
                  <div className="mt-1">
                    <Input id="phone" type="phone" placeholder="Phone" {...register('phone', { required: 'Phone is required' })} />
                  </div>
                  {
                    errors.phone && (
                      <p className="text-sm text-red-600 mt-1">{errors.phone.message as string}</p>
                    )
                  }
                </div>

              </div>

              <div className='flex flex-col sm:flex-row gap-y-3 sm:gap-y-0   gap-x-4'>
                <div className='w-full'>
                    <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                       Old Password
                    </label>
                    </div>
                    <div className="mt-1">
                    <Input id="password" type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
                    </div>
                    {
                    errors.password && (
                        <p className="text-sm text-red-600 mt-1">{errors.password.message as string}</p>
                    )
                    }
                </div>
                <div className='w-full'>
                    <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        New Password
                    </label>
                    </div>
                    <div className="mt-1">
                    <Input id="password" type="password" placeholder="new password" {...register('newPassword', { required: 'New Password is required' })} />
                    </div>
                    {
                    errors.newPassword && (
                        <p className="text-sm text-red-600 mt-1">{errors.newPassword.message as string}</p>
                    )
                    }
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit">
                  {loading ? "Updating...":"Update User"}
                </Button>
              </div>
            </form>
    </div>
  )
}

export default UserForm
