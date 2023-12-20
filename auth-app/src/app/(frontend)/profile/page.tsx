"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React from "react";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [loading,setLoading] = React.useState(false);
  const router = useRouter();
 const logout = async() => {
   try {
    setLoading(true)
      const response = await axios.get("/api/users/logout");
    if(response.data.success){
      toast.success(response.data.message)
      return router.push("/login")
    }
    throw new Error(response.data.message)
   } catch (error:any) {
    console.log(error)
    toast.error(error)
   }finally{
    setLoading(false)
   }

 }
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
    <div>
      {loading && <p>Loading...</p>}
      <h1>Profile</h1>
      <button type="button" onClick={logout} className={`p-2 rounded text-white ${loading ? "bg-blue-200" : "bg-blue-500 "}`} disabled={loading}>Logout</button>
    </div>
    </>
  )
}