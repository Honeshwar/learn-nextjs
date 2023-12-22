"use client";
//click on link at email, we have to this page show and extract token from url and call api to verify token and user
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token:any = urlParams.get("token");
    setToken(token || "");//token is undefined
    
    // const searchUrl = window.location.search;
    // const t = searchUrl.split("=")[1]; 
  },[])

  useEffect(() => {
    if(token.length > 0){
      verifyToken();
    }
  },[token])


const verifyToken = async () => {
  try {
    setLoading(true);
    const response = await axios.post("/api/users/verifyemail", { token });
    if(response.data.success){
        setVerified(true);
        toast.success(response.data.message);
    }
  } catch (error:any) {
    setError(true);//axios pass this way data, error
  }finally {
    setLoading(false);
  }
}

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
    <div className="flex flex-col justify-center items-center h-screen">
        <h1>Veifying Email</h1>
        {loading && <p>Loading...</p>}
        {verified && <p className="text-green-500 bg-green-100 p-2">Verified <br/> <Link href="/login">Go and  Login your account</Link></p>}
        {error && <p>Not Verified</p>}
        
    </div>
    </>
    )
}