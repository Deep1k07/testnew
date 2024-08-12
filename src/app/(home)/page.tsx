'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Home() {
  const session = useSession()
  return (
    <>
      {
        session?.data?.user?.role === "Admin" ? (
          <div className="font-bold flex justify-center">
            {session?.data?.user ? `Welcome ${session?.data?.user?.username} you are ${session?.data?.user?.role}` : "Dashboard"}
          </div>
        ) : session?.data?.user?.role === "BA_Manager" ? (
          <div>BA Manager</div>
        ) : session?.data?.user?.role === "Scope_Manager" ? (
          <div className="font-bold flex justify-center">
            {session?.data?.user ? `Welcome ${session?.data?.user?.username} you are ${session?.data?.user?.role}` : "Dashboard"}
          </div>
        ) : session?.data?.user?.role === "Quality_Manager" ? (
          <div className="font-bold flex justify-center">
            {session?.data?.user ? `Welcome ${session?.data?.user?.username} you are ${session?.data?.user?.role}` : "Dashboard"}
          </div>
        ) : session?.data?.user?.role === "Certificate_Manager" ? (
          <div>Certificate Manager</div>
        ) : ""
      }
    </>
  )
}
