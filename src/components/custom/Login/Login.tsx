"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [loading,setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [type, setType] = useState(false)
  const router = useRouter();
  const {handleSubmit , register} = useForm();
  const showOff = () => {
    setShow((pre) => !pre)
    setType((pre) => !pre)
  }

  const handleLogin  = async(data: any)=>{
    try {
      if (!data.email)
        return toast.error("Email is required", { id: "email-error" });
      else if (!data.password)
        return toast.error("Password is required", {
          id: "password-error",
        });
      let toastID = toast.loading("Logging in...");
      const {email,password} = data;
      setLoading(true)
      let res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.status === 200) {
        toast.success("Login successful",{id: toastID});
        router.push('/')
      } else {
        toast.error(res?.error , {id: toastID});
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input id="email" type="email" placeholder="Email" {...register('email')}/>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <Input
              id="password"
              type={type ? "text" : "password"}
              placeholder="Password"
              {...register('password')}
            />
            <span className="cursor-pointer absolute bottom-3 right-3" onClick={() => showOff()}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</span>
          </div>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            className={`flex w-full justify-center`}
            disabled={loading}
          >
            {loading? "Logging-in...":"Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
