"use client"
import react from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Toaster} from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user,setUser] = react.useState({username:"",email:"",password:""})
  const [loading,setLoading] = react.useState(false);
  const [btnDisabled,setBtnDisabled] = react.useState(true);
  react.useEffect(()=>{
   if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
    setBtnDisabled(false)
    toast.success("Form is valid")
   }else{
    setBtnDisabled(true)
   }
 },[user])
  const handleSubmit = async (e:any) => {
   e.preventDefault()
   console.log(user)
   try {
    setLoading(true);
    const response = await axios.post("/api/users/signup",user)// id axios ma any status 404,500 automaticaly give an error called axios error , automatically pass response from axios error obj to catch ma
    console.log(response.data,"data")
      if(response.data.success === true){
        toast.success(response.data.message)
        return router.push("/login");
      }
      // only work when status 100,200,300, or when success = false
      throw new Error(response.data.message) ;
   } catch (error:any) {
     console.log(error.response?.data?.message || error)
      toast.error(error.response?.data?.message || error.toString())
   }finally{//use case for finally
     setLoading(false);
   }
  }
  
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
     <form action="" onSubmit={handleSubmit} className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
      {loading && <p>Loading...</p>}
         <h1 className="text-3xl">SignUp</h1>
         <div className='flex flex-col gap-2 items-center'>
      <label htmlFor="username">Username</label>
       <input type="username" id="username" onChange={(e) => setUser({...user,username:e.target.value})} required/>
      </div>
      <div className='flex flex-col gap-5 items-center'>
      <label htmlFor="email">Email</label>
       <input type="email" id="email" onChange={(e) => setUser({...user,email:e.target.value})} required/>
      </div>
      <div className='flex flex-col gap-5 items-center'>
      <label htmlFor="password">Password</label>
       <input type="password" id="password" onChange={(e) => setUser({...user,password:e.target.value})} required/>
      </div>
      <button type='submit' disabled={btnDisabled ? true : false} className={`p-2 rounded text-white ${btnDisabled ? "bg-blue-200" : "bg-blue-500 "}`}>SignUp</button>
      <Link href="/login" className="text-blue-500">Login</Link>
     </form>       
    </>
    )
}