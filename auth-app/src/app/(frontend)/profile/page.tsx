"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import React from "react";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [loading,setLoading] = React.useState(false);
  const [id,setId] = React.useState("Nothing");

  React.useEffect(():void=>{
    if(id === "Nothing"){
      const fetchUserData = async()=>{
        try{
          setLoading(true)
          const response:any = await axios.get("/api/users/me");
          console.log("user",response.data)
          if(response.data?.success){
            toast.success(response.data.message)
            setId(response.data.data._id);
            return;
          }
        throw new Error("User Not Found")// in case of error from server we only get message because we send only message.
        }catch(errorMessage:any){
          toast.error(errorMessage)
          return;
      }finally{
        setLoading(false)
      }
      }
      fetchUserData()
    }
  },[])
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
      <Link href={`/profile/${id}`} className={`p-2 rounded text-white bg-blue-500`}>{id}</Link  >
      <h1>Profile</h1>
      <button type="button" onClick={logout} className={`p-2 rounded text-white ${loading ? "bg-blue-200" : "bg-blue-500 "}`} disabled={loading}>Logout</button>
    </div>
    </>
  )
}